var inputEl = $('input')
var currCityEl = $('.currCity')
var city = inputEl.val()
const apiKey =`7b9f6bec4c139049a453497279489bbe`
var lat = localStorage.getItem('lat')
var lon = localStorage.getItem('lon')
const part ='hourly'


function getInfo(){
   /*  var city = inputEl.val()
    console.log(city)

    currCityEl.text(`${city} ${moment().format('L')}`) */

    getWeather()

    lat = localStorage.getItem('lat')
    lon = localStorage.getItem('lon')

    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=imperial&appid=${apiKey}`
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputEl.val()}&exclude=hourly&appid=${apiKey}`

    console.log(oneCallUrl)
  
    fetch(forecastUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
    .catch(console.err)

    fetch(oneCallUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        console.log(data.current.temp)
        console.log(data.current.wind_speed)
        console.log(data.current.humidity)
        console.log(data.current.uvi)

        var temp = data.current.temp
        var ws = data.current.wind_speed
        var humid = data.current.humidity
        var uvi = data.current.uvi
        var color =''

        if (uvi < .5){
            color = 'green'
        } else if(uvi < .8 && uvi >.5){
            color = 'yellow'
        } else {
            color = 'red'
        }

        var output = `Temp: ${temp} | Wind: ${ws} | Humidity: ${humid} | UV Index: <span class="py-1 px-3" style="color: white; border-radius: 1px; background-color:${color}">${uvi}</span>`

        $('.currWeather').html(output)

    })
  

}

function getWeather(){
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.val()}&units=imperial&appid=${apiKey}`
 
     

    fetch(weatherUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        console.log(data.coord)
        localStorage.setItem('lat', JSON.stringify(data.coord.lat))
        localStorage.setItem('lon', JSON.stringify(data.coord.lon))
        console.log(data.coord.lat)
        console.log(data.coord.lon)
        localStorage.getItem('lat')
        localStorage.getItem('lon')
        console.log(data.weather.icon)

        var city = data.name
        var icon = data.weather[0].icon

        $('.currIcon').html(`<img src="./assets/icons/${icon}.png"/>`)
        

        currCityEl.text(`Currently in ${city}` /* ${moment().format('L')} */)

    })
    .catch(console.err)

}

function getForecast(){}

function createHistBtn(){}