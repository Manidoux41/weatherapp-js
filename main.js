/**
 * Represents the API configuration object.
 */
const api = {
    key: "96140d704e8e25b0e6b4cbdf910e0ca1",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

/**
 * Executes a specific action when the enter key is pressed.
 *
 * @param {Event} e - The event object representing the key press event.
 */
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

/**
 * Executes a specific action when the enter key is pressed.
 *
 * @param {Event} e - The event object representing the key press event.
 */
function setQuery(e) {
    if(e.keyCode == 13) {
        getResults(searchbox.value);
    }
}

/**
 * Retrieves weather results based on the provided query.
 *
 * @param {string} query - The city or location to search for weather results.
 * @return {Promise} - A promise that resolves to the weather results.
 */
function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
        return weather.json()
        })
        .then(displayResults) 
}

/**
 * Displays the weather results on the webpage.
 *
 * @param {object} weather - The weather data to be displayed.
 * @return {void} This function does not return anything.
 */
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

}

/**
 * Builds a formatted date string based on the given date object.
 *
 * @param {Date} d - The date object to build the string from.
 * @return {string} The formatted date string in the format "day date month year".
 */
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}