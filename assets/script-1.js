var apiKey = "4024dd0ace3444c4f05da7654e63fece"
var submitBtn = document.querySelector('#submitBtn')
var searchCity = document.querySelector('#searchCity')

submitBtn.addEventListener("click",function(){
    console.log(searchCity.value) 
    geoLocation(searchCity.value)
})

function geoLocation(cityName) {
    var geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q='+ cityName + '&limit=1&appid=' + apiKey;
    fetch(geoCodeApi)
    .then((response)=>{
        // console.log(response)
        return response.json()
    })
    .then((data)=>{
    console.log(data)
    console.log(data[0].lat)
    console.log(data[0].lon)
    getWeather(data[0].lat,data[0].lon)
    })
}

function getWeather(lat,lon) {
    var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat &lon={lon}&exclude={part}&appid={API key}'
}