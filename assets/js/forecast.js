// api key
key = 'eadb20433e6df59a3eca6031b67b3de7'



// get city information
// var cityApi = `api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`

// 
// var latlonApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`

// get weather information 
// var getCurrentWeather = 

var getFiveDayForecast = async (lat, lon) => {
    var base = 'https://api.openweathermap.org/data/2.5/forecast';
    var query = `?lat=${lat}&lon=${lon}&appid=${key}`;

    var response = await fetch(base + query);
    var data = await response.json();

    return data;
};

// get current weather with city, pass lat and lon onto getFiveDayForecast
var getCurrentWeather = async (city) => {
    var base = 'https://api.openweathermap.org/data/2.5/weather';
    var query = `?q=${city}&units=imperial&appid=${key}`;

    var response = await fetch(base + query);
    var data = await response.json();

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    getFiveDayForecast(lat, lon);

    return data;
};



