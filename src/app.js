function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours <10){
        hours=`0${hours}`; 
    }
    let minutes = date.getMinutes();
    if(minutes <10){
        minutes=`0${minutes}`; 
    }
    let days = ["Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thuesday",
      "Friday",
      "Saturday"];

    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;

}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[day];
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement= document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;  
    let windElement= document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let dateElement= document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecast(response.data.coord);
}   

function search(city){
    let apiKey="1a6432c5ca7b6f9b0bee45c98d54ea71";
    let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    console.log(cityInputElement.value);
    search(cityInputElement.value);
}


function displayFahrenheitTempetarure(event){
    event.preventDefault();
    let fahrenheitTempetarure = (celsiusTemperature*9/5)+32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(fahrenheitTempetarure);
    calsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}


function displayCalsiusTempetarure(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    calsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Mon", 
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"];
    forecast.forEach(function(forecastDay,index){
        if(index < 6){
        forecastHTML = 
     forecastHTML + 
     `
        <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt=""
            width="48"/>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}??</span>
            <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}??</span>
          </div>
        </div>     
      `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
}



let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTempetarure);

let calsiusLink = document.querySelector("#calsius-link");
calsiusLink.addEventListener("click", displayCalsiusTempetarure);

search("New York");
