var submitBtn = document.querySelector('#submitBtn');
var searchCity = document.querySelector('#searchCity');
var lastSearch = document.querySelector('#lastSearch');
var storedCities = localStorage.getItem('lastCity')
var apiKey = "4024dd0ace3444c4f05da7654e63fece"
var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var uvImages = document.querySelector('.uvIndex')
var uvScale = 

for (let i = 0; i < array.length; i++) {
    const element = array[i];
    
}

submitBtn.addEventListener("click", function () {
    var cityName = searchCity.value;
    geoLocation(cityName);
    localStorage.setItem('lastCity', JSON.stringify(searchCity.value));
    lastSearch.textContent = storedCities;

})


function geoLocation(cityName) {
    var geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;

    console.log(geoCodeApi)

    fetch(geoCodeApi)
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            getWeather(data[0].lat, data[0].lon)
        })
}

function getWeather(lat, lon) {
    var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

    fetch(oneCallApi)
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            displayCurrentWeather(data)
            displayDailyForecast(data)
        })
}



function displayCurrentWeather(data) {
    var cityH2 = document.querySelector("#cityName");
    cityH2.textContent = searchCity.value;

    var tempH3 = document.querySelector("#temp");
    tempH3.textContent = data.current.temp
}

function displayDailyForecast(data) {
    var day1Forecast = document.querySelector('#day1Weather');
    var day2Forecast = document.querySelector('#day2Weather');
    var day3Forecast = document.querySelector('#day3Weather');
    var day4Forecast = document.querySelector('#day4Weather');
    var day5Forecast = document.querySelector('#day5Weather');
    // var city = document.querySelector('.city');
    // Variables for city caption
    var city1 = document.querySelector('#day1City')
    var city2 = document.querySelector('#day2City')
    var city3 = document.querySelector('#day3City')
    var city4 = document.querySelector('#day4City')
    var city5 = document.querySelector('#day5City')
    var uv1 = document.querySelector('#uvIndex1')
    var uv2 = document.querySelector('#uvIndex2')
    var uv3 = document.querySelector('#uvIndex3')
    var uv4 = document.querySelector('#uvIndex4')
    var uv5 = document.querySelector('#uvIndex5')
//  Setting content of HTML to searched city
    city1.textContent = searchCity.value
    city2.textContent = searchCity.value
    city3.textContent = searchCity.value
    city4.textContent = searchCity.value
    city5.textContent = searchCity.value
    // city.textContent = searchCity.value;
    // Setting content of HTML to temperature
    day1Forecast.textContent = data.daily[1].temp.day;
    day2Forecast.textContent = data.daily[2].temp.day;
    day3Forecast.textContent = data.daily[3].temp.day;
    day4Forecast.textContent = data.daily[4].temp.day;
    day5Forecast.textContent = data.daily[5].temp.day;
    uv1.textContent = 'UV: ' + data.daily[1].uvi;
    uv2.textContent = 'UV: ' + data.daily[2].uvi;
    uv3.textContent = 'UV: ' + data.daily[3].uvi;
    uv4.textContent = 'UV: ' + data.daily[4].uvi;
    uv5.textContent = 'UV: ' + data.daily[5].uvi;
}

console.log(data.daily[1].uvi)

// if (data.value === 2 || 1 || 0) {
    
// } else {
    
// }