const tempDegree = document.querySelector('.temp-degree');
const tempDesc = document.querySelector('.description');
const locationTz = document.querySelector('.location-timezone');
window.addEventListener('load', () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long);
      console.log(lat);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a1b89122aba9dfbc2b3144e6151f66a5`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then(function (resp) {
          console.log(resp);
          let { temp } = resp.main;
          const { description, icon } = resp.weather[0];
          console.log(icon);
          temp = temp - 273.15;
          tempDegree.innerHTML = temp;
          tempDesc.innerHTML = description;
          locationTz.innerHTML = resp.name;
          const img = document.createElement('img');
          document.querySelector('.location').appendChild(img);
          img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
  }
});
