
var inputEl = $('input')
var currCityEl = $('.currCity')
var city = inputEl.val()
const apiKey =`7b9f6bec4c139049a453497279489bbe`
var lat = localStorage.getItem('lat')
var lon = localStorage.getItem('lon')
const part ='minutely,hourly'
var recentSearches = localStorage.getItem("recentSearches")


function getInfo(){

   /*  var city = inputEl.val()
    console.log(city)

    currCityEl.text(`${city} ${moment().format('L')}`) */

    console.log('running getInfo')

    getLatLon()

    lat = localStorage.getItem('lat')
    lon = localStorage.getItem('lon')

    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=imperial&appid=${apiKey}`

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

        var output = `Temp: ${temp}°F | Wind: ${ws} MPH | Humidity: ${humid}% | UV Index: <span class="py-1 px-3" style="color: white; border-radius: 1px; background-color:${color}">${uvi}</span>`

        $('.currWeather').html(output)

        var forecast = data.daily.slice(1,6)

        var forecastOutput =''

        forecast.forEach(data => {

            var unix_timestamp = data.dt
            var day = new Date(unix_timestamp * 1000).getDate()
            var month = new Date(unix_timestamp * 1000).getMonth()
            var year = new Date(unix_timestamp * 1000).getFullYear()

            forecastOutput += `<div class="m-2 p-1" style="border: 1px solid black; border-radius: 10px;"> <p style="font-weight:bold;">${month}/${day}/${year}</p>
            <img src="./assets/icons/${data.weather[0].icon}.png"/>\n<br>
            Temp:${data.temp.day}°F<br>
            Wind: ${data.wind_speed} MPH<br>
            Humidity: ${data.humidity}%</div>`

        })

        $('.forecast').html(forecastOutput)
        $('.forecast-box').css('visibility','visible')
    })
    .catch(console.err) 
}

function getLatLon(){
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.val()}&units=imperial&appid=${apiKey}`
 
    fetch(weatherUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        /*console.log(data.coord) */
        localStorage.setItem('lat', JSON.stringify(data.coord.lat))
        localStorage.setItem('lon', JSON.stringify(data.coord.lon))
       /*  console.log(data.coord.lat)
        console.log(data.coord.lon) */
        /* localStorage.getItem('lat')
        localStorage.getItem('lon') */

        var city = data.name
        console.log(city)
        var icon = data.weather[0].icon
        console.log(icon)

        $('.currIcon').html(`<img src="./assets/icons/${icon}.png"/>`)
        

        currCityEl.text(`Currently in ${city}` /* ${moment().format('L')} */)

        createBtn()

    })
    .catch(console.err)
}

function createBtn(){

}
