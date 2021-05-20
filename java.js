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
let minutes = now.getMinutes();
let currentYear = now.getFullYear();
let today = now.getDate();

pToday.innerHTML = `Today is ${currentDay}, ${currentMonth} ${today} ${currentYear}, ${hours}:${minutes}`;

// Change City & Search Enginge
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
  let CurMinTemp = document.querySelector("#Min");
  CurMinTemp.innerHTML = `Min: ${MinTempElement} °C `;

  let MaxTempElement = Math.round(response.data.main.temp_max);
  let CurMaxTemp = document.querySelector("#Max");
  CurMaxTemp.innerHTML = `Max: ${MaxTempElement} °C `;

  let humidityElement = document.querySelector("#Rain");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}
let CurTemp = document.querySelector("#entercity");
CurTemp.addEventListener("submit", displayWeather);
