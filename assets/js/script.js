
var inputEl = $('input')
var currCityEl = $('.currCity')
const apiKey =`7b9f6bec4c139049a453497279489bbe`
const part ='minutely,hourly'

if(localStorage.getItem('recentSearches')){
    var recentSearches= JSON.parse(localStorage.getItem('recentSearches'))
    recentSearches = recentSearches.reverse()
    recentSearches.forEach(city =>{
        $(".search-history").append(`<button type="button" class="cityBtn btn btn-primary col-10 m-1" data-city="${city}">${city}</button>`)
    })
}

function getInfo(){
    let input = inputEl.val()
    getLatLon(input)
}

async function getLatLon(city){

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    const response = await fetch(weatherUrl);
    const data = await response.json()
  
    localStorage.setItem('lat', JSON.stringify(data.coord.lat))
    localStorage.setItem('lon', JSON.stringify(data.coord.lon))
  
    localStorage.getItem('lat')
    localStorage.getItem('lon')

    var icon = data.weather[0].icon

    var today = new Date().toLocaleDateString('en-US')
    
    $('.currIcon').html(`<img src="./assets/icons/${icon}.png"/>`)
    currCityEl.text(`Currently in ${city} (${today})`)

    getForecast()
    createBtn(city) 
}

function getForecast(){
    
    var lat = localStorage.getItem('lat')
    var lon = localStorage.getItem('lon')
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=imperial&appid=${apiKey}`

    fetch(oneCallUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        var temp = data.current.temp
        var ws = data.current.wind_speed
        var humid = data.current.humidity
        var uvi = data.current.uvi
        var color =''

        if (uvi < 3){
            color = 'green'
        } else if(uvi < 6 && uvi > 2){
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
            var month = new Date(unix_timestamp * 1000).getMonth() + 1
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


function createBtn(city){

    if (city.includes('+')){ input.replace('+', ' ') }

    if(localStorage.getItem('recentSearches') == null){
        var searchArr = [city]
        localStorage.setItem('recentSearches', JSON.stringify(searchArr))
        var recentSearches = JSON.parse(localStorage.getItem('recentSearches'))
        $(".search-history").append(`<button type="button" class="cityBtn btn btn-primary col-10 m-1" data-city="${city}">${city}</button>`)
    } else {
        var recentSearches= JSON.parse(localStorage.getItem('recentSearches'))
        if(recentSearches.includes(city)){
            return;
        } else if (recentSearches.length == 7) {
            recentSearches.shift()

            $('.search-history').empty()
            
            recentSearches.push(city)
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
            recentSearches = recentSearches.reverse()
            recentSearches.forEach(city =>{
                $(".search-history").append(`<button type="button" class="cityBtn btn btn-primary col-10 m-1" data-city="${city}">${city}</button>`)
            })
        } else {
            var city = inputEl.val()
            recentSearches.push(city)
            $(".search-history").prepend(`<button type="button" class="cityBtn btn btn-primary col-10 m-1" data-city="${city}">${city}</button>`)
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
        }
    }

}

$(".search-history").on("click", e=>{
    cityBtnForecast(e.target.dataset.city)
}) 


function cityBtnForecast(city) {
    let input = city
    getLatLon(input)
}