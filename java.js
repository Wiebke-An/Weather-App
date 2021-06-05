// Format Date

let now = new Date();
let pToday = document.querySelector(".TodayIs");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = months[now.getMonth()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentYear = now.getFullYear();
let today = now.getDate();

pToday.innerHTML = `Last updated: ${currentDay}, ${currentMonth} ${today} ${currentYear}, ${hours}:${minutes}`;

// Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
         <input
              type="image"
              src="icons/cloudy.png"
              width="35px"
            />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c3b5b86464d7fae06b475e856feb3c14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Change City & Search Enginge

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}

function SearchCity(event) {
  event.preventDefault();
  let SearchInput = document.querySelector("#CityInput");

  let City = document.querySelector("#CityChanging");
  if (SearchInput.value) {
    City.innerHTML = `${SearchInput.value}`;
  }
}

let citynew = document.querySelector("#entercity");
citynew.addEventListener("submit", SearchCity);

function displayWeather(event) {
  event.preventDefault();
  let apiKey = "c3b5b86464d7fae06b475e856feb3c14";
  let units = "metric";
  let SearchResult = document.querySelector("#CityInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${SearchResult}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".Temperature");
  currentTemperature.innerHTML = ` ${temperature} °C`;

  let weatherDescription = document.querySelector("#Description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let MinTempElement = Math.round(response.data.main.temp_min);
  let MaxTempElement = Math.round(response.data.main.temp_max);
  let HotCold = document.querySelector(".Minmax");
  HotCold.innerHTML = `${MinTempElement} °C | ${MaxTempElement} °C`;

  let humidityElement = document.querySelector("#Rain");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let WindElement = Math.round(response.data.wind.speed);
  let WindSpeed = document.querySelector("#Windspeed");
  WindSpeed.innerHTML = `Wind: ${WindElement} km/h `;

  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let updatedFeelsLikeTemp = document.querySelector("#Feelslike");
  updatedFeelsLikeTemp.innerHTML = `Feels like: ${feelsLikeTemp} °C  `;

  let IconElement = document.querySelector("#Icon");
  IconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
let CurTemp = document.querySelector("#entercity");
CurTemp.addEventListener("submit", displayWeather);

displayForecast();
search("Cologne");
