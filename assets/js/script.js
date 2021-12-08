var inputEl = $('input')
var city = inputEl.val()
var currCityEl= $('.currCity')
const apiKey =`7b9f6bec4c139049a453497279489bbe`

/* var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}exclude=${exclude}&&appid=${apiKey}` */


function getApi() {

    currCityEl.text(`${city} ${moment().format('L')}`)


    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.val()}&appid=${apiKey}`

    /* `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}exclude=${exclude}&&appid=${apiKey}` */
    
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
    .catch(console.err)

}



    