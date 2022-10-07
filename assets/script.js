const submitBtn = document.querySelector('#submitBtn');
const searchCity = document.querySelector('#searchCity');
const lastSearch = document.querySelector('#lastSearch');
var storedCities = localStorage.getItem('lastCity')
const apiKey = "4024dd0ace3444c4f05da7654e63fece"
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const uvImages = document.querySelector('.uvIndex');
const uvModerate = "/assets/uvscale/uvi-moderate.jpeg"
const uvI = document.getElementById('uv1');
const uvI2 = document.getElementById('uv2');
const uvI3 = document.getElementById('uv3');
const uvI4 = document.getElementById('uv4');
const uvI5 = document.getElementById('uv5');


var cities = [];

localStorage.setItem("cities", JSON.stringify(cities));

for (let index = 0; index < cities.length; index++) {
    const element = array[index];
    
}

//retrieve cities from localstorage
var storedCities = JSON.parse(localStorage.getItem("cities"));

console.log(cities)

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
            displayUV1(data)
            displayUV2(data)
            displayUV3(data)
            displayUV4(data)
            displayUV5(data)
        })
}



function displayCurrentWeather(data) {
    var cityH2 = document.querySelector("#cityName");
    var todayMax = document.querySelector("#todayMax");
    var todayMin = document.querySelector("#todayMin");
    var todayUV = document.getElementById('todayUV')
    cityH2.textContent = searchCity.value;
    todayMax.textContent = "High: " + data.daily[0].temp.max + "°F"
    todayMin.textContent = "Low: " + data.daily[0].temp.min + "°F"
    if (data.daily[0].uvi <= 2) {
        todayUV.src = "assets/uvscale/uvi-low.jpeg"
    } else if (data.daily[0].uvi > 2 && data.daily[0].uvi < 5) {
        todayUV.src = "assets/uvscale/uvi-moderate.jpeg"
    } else if (data.daily[0].uvi > 5 && data.daily[0].uvi < 8) {
        todayUV.src = "assets/uvscale/uvi-high.jpeg"
    } else if (data.daily[0].uvi >= 8 && data.daily[0].uvi <= 10) {
        todayUV.src = "assets/uvscale/uvi-veryhigh.jpeg"
    } else {
        todayUV.src = "assets/uvscale/uvi-extreme.jpeg"
    }
}

function displayDailyForecast(data) {
    let weekday1 = document.querySelector('#weekday1');
    let weekday2 = document.querySelector('#weekday2');
    let weekday3 = document.querySelector('#weekday3');
    let weekday4 = document.querySelector('#weekday4');
    let weekday5 = document.querySelector('#weekday5');
    let day1High = document.querySelector('#day1High');
    let day1Low = document.querySelector('#day1Low');
    let day2High = document.querySelector('#day2High');
    let day2Low = document.querySelector('#day2Low');
    let day3High = document.querySelector('#day3High');
    let day3Low = document.querySelector('#day3Low');
    let day4High = document.querySelector('#day4High');
    let day4Low = document.querySelector('#day4Low');
    let day5High = document.querySelector('#day5High');
    let day5Low = document.querySelector('#day5Low');
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
    let day1Wind = document.getElementById('day1Wind');
    let day2Wind = document.getElementById('day2Wind');
    let day3Wind = document.getElementById('day3Wind');
    let day4Wind = document.getElementById('day4Wind');
    let day5Wind = document.getElementById('day5Wind');
    let day1Humidity = document.getElementById('day1Humidity');
    let day2Humidity = document.getElementById('day2Humidity');
    let day3Humidity = document.getElementById('day3Humidity');
    let day4Humidity = document.getElementById('day4Humidity');
    let day5Humidity = document.getElementById('day5Humidity');
    //  Setting content of HTML to searched city
    city1.textContent = searchCity.value
    city2.textContent = searchCity.value
    city3.textContent = searchCity.value
    city4.textContent = searchCity.value
    city5.textContent = searchCity.value
    // Setting content of HTML to temperature
    day1High.textContent = 'High: ' + data.daily[1].temp.max + '°F';
    day1Low.textContent = 'Low: ' + data.daily[1].temp.min + '°F';
    day2High.textContent = 'High: ' + data.daily[2].temp.max + '°F';
    day2Low.textContent = 'Low: ' + data.daily[2].temp.min + '°F';
    day3High.textContent = 'High: ' + data.daily[3].temp.max + '°F';
    day3Low.textContent = 'Low: ' + data.daily[3].temp.min + '°F';
    day4High.textContent = 'High: ' + data.daily[4].temp.max + '°F';
    day4Low.textContent = 'Low: ' + data.daily[4].temp.min + '°F';
    day5High.textContent = 'High: ' + data.daily[5].temp.max + '°F';
    day5Low.textContent = 'Low: ' + data.daily[5].temp.min + '°F';
    weekday1.textContent = day1;
    weekday2.textContent = day2;
    weekday3.textContent = day3;
    weekday4.textContent = day4;
    weekday5.textContent = day5;
    day1Wind.textContent = "Wind: " + Math.floor(data.daily[1].wind_speed * 2.23694) + " MPH"
    day2Wind.textContent = "Wind: " + Math.floor(data.daily[2].wind_speed * 2.23694) + " MPH"
    day3Wind.textContent = "Wind: " + Math.floor(data.daily[3].wind_speed * 2.23694) + " MPH"
    day4Wind.textContent = "Wind: " + Math.floor(data.daily[4].wind_speed * 2.23694) + " MPH"
    day5Wind.textContent = "Wind: " + Math.floor(data.daily[5].wind_speed * 2.23694) + " MPH"
    day1Humidity.textContent = "Humdity: " + data.daily[1].humidity + "%"
    day2Humidity.textContent = "Humdity: " + data.daily[2].humidity + "%"
    day3Humidity.textContent = "Humdity: " + data.daily[3].humidity + "%"
    day4Humidity.textContent = "Humdity: " + data.daily[4].humidity + "%"
    day5Humidity.textContent = "Humdity: " + data.daily[5].humidity + "%"
}

function displayUV1(data) {
    if (data.daily[1].uvi <= 2) {
        uvI.src = "assets/uvscale/uvi-low.jpeg"
    } else if (data.daily[1].uvi > 2 && data.daily[1].uvi < 5) {
        uvI.src = "assets/uvscale/uvi-moderate.jpeg"
    } else if (data.daily[1].uvi > 5 && data.daily[1].uvi < 8) {
        uvI.src = "assets/uvscale/uvi-high.jpeg"
    } else if (data.daily[1].uvi >= 8 && data.daily[1].uvi <= 10) {
        uvI.src = "assets/uvscale/uvi-veryhigh.jpeg"
    } else {
        uvI.src = "assets/uvscale/uvi-extreme.jpeg"
    }
}

function displayUV2(data) {
    if (data.daily[2].uvi <= 2) {
        uvI2.src = "assets/uvscale/uvi-low.jpeg"
    } else if (data.daily[2].uvi > 2 && data.daily[2].uvi < 5) {
        uvI2.src = "assets/uvscale/uvi-moderate.jpeg"
    } else if (data.daily[2].uvi > 5 && data.daily[2].uvi < 8) {
        uvI2.src = "assets/uvscale/uvi-high.jpeg"
    } else if (data.daily[2].uvi >= 8 && data.daily[2].uvi <= 10) {
        uvI2.src = "assets/uvscale/uvi-veryhigh.jpeg"
    } else {
        uvI2.src = "assets/uvscale/uvi-extreme.jpeg"
    }
}

function displayUV3(data) {
    if (data.daily[3].uvi <= 2) {
        uvI3.src = "assets/uvscale/uvi-low.jpeg"
    } else if (data.daily[3].uvi > 2 && data.daily[3].uvi < 5) {
        uvI3.src = "assets/uvscale/uvi-moderate.jpeg"
    } else if (data.daily[3].uvi > 5 && data.daily[3].uvi < 8) {
        uvI3.src = "assets/uvscale/uvi-high.jpeg"
    } else if (data.daily[3].uvi >= 8 && data.daily[3].uvi <= 10) {
        uvI3.src = "assets/uvscale/uvi-veryhigh.jpeg"
    } else {
        uvI3.src = "assets/uvscale/uvi-extreme.jpeg"
    }
}

function displayUV4(data) {
    if (data.daily[4].uvi <= 2) {
        uvI4.src = "assets/uvscale/uvi-low.jpeg"
    } else if (data.daily[4].uvi > 2 && data.daily[4].uvi < 5) {
        uvI4.src = "assets/uvscale/uvi-moderate.jpeg"
    } else if (data.daily[4].uvi > 5 && data.daily[4].uvi < 8) {
        uvI4.src = "assets/uvscale/uvi-high.jpeg"
    } else if (data.daily[4].uvi >= 8 && data.daily[4].uvi <= 10) {
        uvI4.src = "assets/uvscale/uvi-veryhigh.jpeg"
    } else {
        uvI4.src = "assets/uvscale/uvi-extreme.jpeg"
    }
}

function displayUV5(data) {
    if (data.daily[5].uvi <= 2) {
        uvI5.src = "assets/uvscale/uvi-low.jpeg"
    } else if (data.daily[5].uvi > 2 && data.daily[5].uvi < 5) {
        uvI5.src = "assets/uvscale/uvi-moderate.jpeg"
    } else if (data.daily[5].uvi > 5 && data.daily[5].uvi < 8) {
        uvI5.src = "assets/uvscale/uvi-high.jpeg"
    } else if (data.daily[5].uvi >= 8 && data.daily[5].uvi <= 10) {
        uvI5.src = "assets/uvscale/uvi-veryhigh.jpeg"
    } else {
        uvI5.src = "assets/uvscale/uvi-extreme.jpeg"
    }
}