const submitBtn = document.querySelector('#submitBtn');
const searchCity = document.querySelector('#searchCity');
const lastSearch = document.querySelector('#lastSearch');
var storedCities = localStorage.getItem('lastCity')
const apiKey = "4024dd0ace3444c4f05da7654e63fece"
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const uvImages = document.querySelector('.uvIndex');
const uvModerate = "/assets/uvscale/uvi-moderate.jpeg"
const uvI = document.getElementById('uv1');
uvI.src = "assets/uvscale/uvi-moderate.jpeg"



// var uvScale = 

var cities = [];

localStorage.setItem("cities", JSON.stringify(cities));

//retrieve cities from localstorage
var storedCities = JSON.parse(localStorage.getItem("cities"));

// for (let i = 0; i < array.length; i++) {
//     const element = array[i];

// }

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
            displayUV(data)
        })
}



function displayCurrentWeather(data) {
    var cityH2 = document.querySelector("#cityName");
    cityH2.textContent = searchCity.value;

    var tempH3 = document.querySelector("#temp");
    tempH3.textContent = data.current.temp
}

function displayDailyForecast(data) {
    let weekday1 = document.querySelector('#weekday1');
    let weekday2 = document.querySelector('#weekday2');
    let weekday3 = document.querySelector('#weekday3');
    let weekday4 = document.querySelector('#weekday4');
    let weekday5 = document.querySelector('#weekday5');
    let day1Forecast = document.querySelector('#day1Weather');
    let day2Forecast = document.querySelector('#day2Weather');
    let day3Forecast = document.querySelector('#day3Weather');
    let day4Forecast = document.querySelector('#day4Weather');
    let day5Forecast = document.querySelector('#day5Weather');
    // let city = document.querySelector('.city');
    // letiables for city caption
    let city1 = document.querySelector('#day1City')
    let city2 = document.querySelector('#day2City')
    let city3 = document.querySelector('#day3City')
    let city4 = document.querySelector('#day4City')
    let city5 = document.querySelector('#day5City')
    let today = moment();
    let day1 = moment().add(1, "days").format('dddd');
    let day2 = moment().add(2, "days").format('dddd');
    let day3 = moment().add(3, "days").format('dddd');
    let day4 = moment().add(4, "days").format('dddd');
    let day5 = moment().add(5, "days").format('dddd');
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
    weekday1.textContent = day1;
    weekday2.textContent = day2;
    weekday3.textContent = day3;
    weekday4.textContent = day4;
    weekday5.textContent = day5;
}

function displayUV(data) {
    let uv1 = document.querySelector('#uvIndex1');
    let uv2 = document.querySelector('#uvIndex2');
    let uv3 = document.querySelector('#uvIndex3');
    let uv4 = document.querySelector('#uvIndex4');
    let uv5 = document.querySelector('#uvIndex5');
    uv1.textContent = 'UV: ' + data.daily[1].uvi;
    uv2.textContent = 'UV: ' + data.daily[2].uvi;
    uv3.textContent = 'UV: ' + data.daily[3].uvi;
    uv4.textContent = 'UV: ' + data.daily[4].uvi;
    uv5.textContent = 'UV: ' + data.daily[5].uvi;
    if (data.daily[1].uvi <= 2) {
        uv1.textContent = 'low'
    } else if (data.daily[1].uvi > 2 && data.daily[1].uvi < 5) {
        uvI.src
    } else if (data.daily[1].uvi > 5 && data.daily[1].uvi < 8) {
        uv1.textContent = 'high'
    } else if (data.daily[1].uvi >= 8 && data.daily[1].uvi <= 10) {
        uv1.textContent = 'very high'
    } else {
        uv1.textContent = 'extreme'
    }
}

