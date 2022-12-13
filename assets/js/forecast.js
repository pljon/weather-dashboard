// api key
key = 'eadb20433e6df59a3eca6031b67b3de7'

var getFiveDayForecast = async (lat, lon) => {
    var base = 'https://api.openweathermap.org/data/2.5/forecast';
    var query = `?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

    var response = await fetch(base + query);
    var data = await response.json();

    // test that data is being passed through
    // updateCurrentWeather > runs getCurrentWeather (runs updateFiveDayForecast within function for lat, lon) > does rest of updateCurrentWeather
    // updateFiveDayForecast > runs getFiveDayForecast within function > does rest of updateFiveDayForecast
    // console.log(data);
    
    return data;
};

// get current weather with city, pass lat and lon onto getFiveDayForecast
var getCurrentWeather = async (city) => {
    var base = 'https://api.openweathermap.org/data/2.5/weather';
    var query = `?q=${city}&units=imperial&appid=${key}`;

    var response = await fetch(base + query);

    if (!response.ok) {
        localStorage.removeItem(city);
    }
    
    var data = await response.json();

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    
    updateFiveDayForecast(lat, lon);
    
    return data;
};

