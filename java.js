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

pToday.innerHTML = `Last updated: ${currentDay}, ${hours}:${minutes}`;

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(search);
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

  let humidityElement = document.querySelector("#Rain");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let WindElement = Math.round(response.data.wind.speed);
  let WindSpeed = document.querySelector("#Windspeed");
  WindSpeed.innerHTML = `Wind: ${WindElement} km/h `;

  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let updatedFeelsLikeTemp = document.querySelector("#Feelslike");
  updatedFeelsLikeTemp.innerHTML = `Feels like: ${feelsLikeTemp} °C  `;

  let IconElement = document.querySelector("#Icon");

  IconElement.setAttribute("src", `icon/${response.data.weather[0].icon}.png`);
  getForecast(response.data.coord);
}
let CurTemp = document.querySelector("#entercity");
CurTemp.addEventListener("submit", displayWeather);

search("Cologne");
