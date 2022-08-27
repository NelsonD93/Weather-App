var submitBtn = document.querySelector('#submitBtn');
var searchCity = document.querySelector('#searchCity')
var apiKey = "4024dd0ace3444c4f05da7654e63fece"



submitBtn.addEventListener("click", function () {
    var cityName = searchCity.value;
    geoLocation(cityName)
})


function geoLocation(cityName) {
    var geoCodeApi = 'https://api.openweathermap.org/geo/direct?1.0/q='+ cityName + '&limit=1&appid=' + apiKey;

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

function getWeather(lat,lon) {
    var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=' +lat+ '&lon='+ lon + '&appid=' + apiKey;

    fetch(oneCallApi)
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        console.log(data)
        displayCurrentWeather(data)
    })
}



function displayCurrentWeather(data) {
        var cityH2 = document.querySelector("#cityName");
        cityH2.textContent = searchCity.value;

    var tempH3 = document.querySelector("#temp");
    tempH3.textContent = data.current.temp
}

