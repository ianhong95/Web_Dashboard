document.addEventListener('DOMContentLoaded', function() {
    update();
    document.getElementById('select-city').onchange = update;
});


function update() {
    var city_id = document.getElementById('select-city').value;

    fetch('/', {    // Send a request to Flask server (POST request), passing city_id as a JSON object

        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({'city_id': city_id})

    }).then(function(response) {    // Get the response from Flask server
        return response.json();
    }).then(function (json) {   // Run the following function with the json response from Python
        
        // Assign values from json response to variables
        const weather_desc = json.weather_desc;
        const temp_now = json.temp_now;
        const feels_like = json.feels_like;
        var weather_icon;

        // Weather icon logic
        if (weather_desc.includes('Sun')) {
            weather_icon = '/static/images/sunny.jpg'
        } else if (weather_desc.includes('Cloud')) {
            weather_icon = '/static/images/clouds.jpg'
        } else if (weather_desc.includes('Rain')) {
            weather_icon = '/static/images/rain.jpg'
        } else if (weather_desc.includes('Snow')) {
            weather_icon = '/static/images/snow.jpg'
        }

        // Populate webpage elements with weather info
        document.getElementById('weather-icon').src = weather_icon;
        document.getElementById('weather-desc').innerHTML = weather_desc;
        document.getElementById('temp-now').innerHTML = temp_now + '°C';
        document.getElementById('feels-like').innerHTML = feels_like + '°C';
    })
}
