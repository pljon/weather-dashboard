

var current = dayjs();
var currentDate = current.format('YYYY/MM/DD');
var currentDateApi = current.format('YYYY/MM/DD');

var updateCurrentWeather = async (city) => {
    
    getCurrentWeather(city).then(data => {

        clearAll();

        var iconCode = data.weather[0].icon;
        var iconImg = `https://openweathermap.org/img/wn/${iconCode}.png`

        var htmlTemplate = `<h4 id="current-forecast">Current forecast in <span id="search-city">${data.name} </span><span id="current-date">(${currentDate}):</h4>
        <ul class="list-unstyled">
            <li>Temperature: ${data.main.temp}&degF<img src="${iconImg}" /></li>
            <li>Humidity: ${data.main.humidity}%</li>
            <li>Wind Speed: ${data.wind.speed}miles per hour</li>
        </ul>`

        $('#current-weather').append(htmlTemplate);
        $('#current-weather').addClass('border border-primary rounded p-2');

    })
    
}

var updateFiveDayForecast = async (lat, lon) => {

    getFiveDayForecast(lat, lon).then(data => {
        console.log(data);

        var fiveDay = document.querySelector('#five-day');
        var sectionHeader = document.createElement('h4');
        sectionHeader.innerHTML = `5 day forecast for ${data.city.name}:`
        sectionHeader.className = "w-100 pb-2"
        fiveDay.appendChild(sectionHeader);

        for (i = 0 ; i < data.list.length ; i+=8) {

            // takes the date and time of the 8th index, each day
            // each list item is 3 hours (3 x 8 = 24)
            // 40 / 8 = 5
            var dt_txt = data.list[i].dt_txt;
            var date = dt_txt.substr(0, dt_txt.length - 9);
            
            var iconCode = data.list[i].weather[0].icon;
            var iconImg = `https://openweathermap.org/img/wn/${iconCode}.png`
            
            var temperature = data.list[i].main.temp;
            var windSpeed = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;

            // create a container for the cards
            var card = document.createElement('div');
            card.className = "card border border-primary mx-1 p-2";
            
            // append the card to the five-day section
            // var fiveDay = document.querySelector('#five-day');
            fiveDay.appendChild(card);
            
            // create ul
            var ul = document.createElement('ul');
            ul.className = "list-unstyled text-center";
            
            // create date for each card
            var dateHeader = document.createElement('h5');
            dateHeader.innerHTML = date;
            
            // create listed item for temperature
            var tempLi = document.createElement('li');
            tempLi.innerHTML = `Temperature: ${temperature}&degF`
            
            // create listed item for img element with source being the iconimg
            var img = document.createElement('img');
            img.src = iconImg;

            // create listed item for humidity
            var humidityLi = document.createElement('li');
            humidityLi.innerHTML = `Humidity: ${humidity}%`;
            
            // create listed item for windSpeed
            var windSpeedLi = document.createElement('li');
            windSpeedLi.innerHTML = `Wind Speed: ${windSpeed} mph`;

            // append each ul to the card as a child
            card.appendChild(ul)
            ul.appendChild(dateHeader);
            ul.appendChild(img);
            ul.appendChild(tempLi);
            ul.appendChild(humidityLi);
            ul.appendChild(windSpeedLi);
            
        }       

    })
}

var previousList = document.querySelector('#previous');
var buttonList = document.querySelector('.button-list');
// variable for searched city input
var cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // get city value
    var city = cityForm.city.value.trim();
    
    // see if city value is what we need
    console.log(city);

    // reset the search city form
    cityForm.reset();

    // update with current weather
    updateCurrentWeather(city);
    
    // save to local storage 
    localStorage.setItem(city, city);
    var keys = Object.keys(localStorage);
    // add a button of the last search input
    addButton(city);
    
    
});

// adds a button after a searched city is saved to localstorage
function addButton(city) {
    var button = document.createElement('button');
    button.innerText = localStorage.getItem(city);
    button.className = 'block m-2 p-2 cityBtn';
    buttonList.appendChild(button);
    // listens for a button click, sends function to pull info back
    button.addEventListener('click', () => {
        updateCurrentWeather(city);
    })    
};

var renderCities = () => {
    for (var i = 0; i < localStorage.length; i++) {
        addButton(localStorage.key(i));       
    }
}

renderCities();

function clearAll() {
    $('#current-weather').empty();
    $('#five-day').empty();
};