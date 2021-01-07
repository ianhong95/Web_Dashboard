document.addEventListener('DOMContentLoaded', function() {
    update();
    document.getElementById('select-city').onchange = update;
});


function update() {
    // JavaScript object to make an AJAX request
    const request = new XMLHttpRequest();
    var city_id = document.getElementById('select-city').value;

    // Initialize a new request
    request.open('POST', '/');

    // Define the action to execute when the request returns a response
    request.onload = () => {
        // Get JSON data from request response
        const response = JSON.parse(request.responseText);

        // const weather_icon
        const weather_desc = `${response.weather_desc}`;
        const temp_now = `${response.temp_now}`;
        const feels_like = `${response.feels_like}`;
        var weather_icon;

        if (weather_desc.includes('Sun')) {
            weather_icon = '/static/images/sunny.jpg'
        } else if (weather_desc.includes('Cloud')) {
            weather_icon = '/static/images/clouds.jpg'
        } else if (weather_desc.includes('Rain')) {
            weather_icon = '/static/images/rain.jpg'
        } else if (weather_desc.includes('Snow')) {
            weather_icon = '/static/images/snow.jpg'
        }

        document.getElementById('weather-icon').src = weather_icon;
        document.getElementById('weather-desc').innerHTML = weather_desc;
        document.getElementById('temp-now').innerHTML = temp_now + '°C';
        document.getElementById('feels-like').innerHTML = feels_like + '°C';
    }

    // Setup/prepare the data to be sent to Python by making a FormData object
    const data = new FormData();
    data.append('city_id', city_id)

    // Send the data to Python, return false to prevent the page from reloading
    request.send(data);
    return false;
};