function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  let city = cityInputElement.value;

  let apiKey = "08dc473fat5683eb45d51fcd6703o645";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let tempElement = document.querySelector("#nowTempValue");
  let cityElement = document.querySelector("#cityNow");
  let humidityElement = document.querySelector("#humidityNow");
  let windElement = document.querySelector("#windNow");
  let iconElement = document.querySelector("#iconNow");
  let descriptionElement = document.querySelector("#descriptionNow");
  let dateElement = document.querySelector("#dateNow");
  let dateTime = new Date(response.data.time * 1000);
  console.log(dateTime);

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  descriptionElement.innerHTML = response.data.condition.description;
  dateElement.innerHTML = getDateTime(dateTime);

  getForecast(response.data.city);
}

function getDateTime(dateTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateTime.getDay()];
  let minutes = dateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = dateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "08dc473fat5683eb45d51fcd6703o645";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function showForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6 && index > 0) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecastDay id="forecastDay">
          <div class="forecastDayName" id="day1">${formatDay(day.time)}</div>
          <div class="forecastDayIcon" id="iconDay1"><img src="${
            day.condition.icon_url
          }"></div>
          <div class="forecastDayTemp" id="tempDay1">
          <div class = "temp" id ="maxTemp">${Math.round(
            day.temperature.maximum
          )}°C</div>
          <div class ="temp" id ="minTemp">${Math.round(
            day.temperature.minimum
          )}°C</div>
          </div>
        </div> `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchWeatherForm = document.querySelector("#weatherSearch");
searchWeatherForm.addEventListener("submit", searchCity);
