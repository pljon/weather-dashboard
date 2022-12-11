// variable for searched city input
var cityForm = document.querySelector('form');

var current = dayjs();
var currentDate = current.format('MM/DD/YYYY');

var updateCurrentWeather = async (city) => {
    
    getCurrentWeather(city).then(data => {

        clearAll();

        var iconCode = data.weather[0].icon;
        var iconImg = `https://openweathermap.org/img/wn/${iconCode}.png`

        var htmlTemplate = `<h4 id="current-forecast">Current forecast in <span id="search-city">${data.name} </span><span id="current-date">(${currentDate}):</h4>
        <ul class="list-unstyled">
            <li>Temperature: ${data.main.temp}<img src="${iconImg}" /></li>
            <li>Humidity: ${data.main.humidity}</li>
            <li>Wind Speed: ${data.wind.speed}</li>
        </ul>`

        $('#current-weather').append(htmlTemplate);
        $('#current-weather').addClass('border border-primary rounded pt-2');

    })
    
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // get city value
    var city = cityForm.city.value.trim();

    // see if city value is what we need
    console.log(city);

    // reset the search city form
    cityForm.reset();

    // update ui with current weather
    updateCurrentWeather(city);
});

function clearAll() {
    $('#current-weather').empty();
    $('#five-day').empty();
}

// <h3 id="current-forecast">Current forecast in <span id="search-city"></span><span id="current-date"></span><span id="weather-icon"></span>:</h3>
// <h3 id="five-day">5-day forecast:</h3>

// test if it pulls data for new york
getCurrentWeather('new york').then(data => {
    console.log(data);
    // city name
    console.log(data.name);
    var cityName = data.name;
    // the date
    console.log(currentDate);
    // an icon representation of weather conditions
    var iconCode = data.weather[0].icon;
    var iconImg = `https://openweathermap.org/img/wn/${iconCode}.png`
    console.log(iconImg);
    // the temperature
    console.log(data.main.temp); 
    // the humidity
    console.log(data.main.humidity); 
    // and the wind speed
    console.log(data.wind.speed);
})

// test with lat: 40.7143, lon: -74.006 for new york