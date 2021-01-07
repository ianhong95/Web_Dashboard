from flask import Flask, render_template, url_for, request, jsonify
import requests
import json
import datetime

# Define API keys
weather_api_key = 'bca5d952afce81ef1154cef3bb6fedad'
nba_api_key = 'f9fad3b559msh2ee311554352888p14bf29jsn1d94ef843fe4'

# Initialize date values
dateNow = datetime.datetime.now().strftime('%Y-%m-%d')
dateTomorrow = (datetime.date.today() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')


app = Flask(__name__)


@app.route('/')
def display_home():
    return render_template('home.html')


@app.route('/', methods=['POST'])
def update_weather():
    units = 'metric'

    # res = request.form.get('city_id')
    res = request.get_json('city_id')

    city_id = res['city_id']

    weather_res = requests.get(f'http://api.openweathermap.org/data/2.5/weather?id={city_id}&appid={weather_api_key}&units={units}')

    res_content = json.loads(weather_res.content)

    weather_desc = res_content['weather'][0]['description'].title()

    temp_now = int(res_content['main']['temp'])
    feels_like = int(res_content['main']['feels_like'])

    weather_info = {
        "weather_desc": weather_desc,
        "temp_now": temp_now,
        "feels_like": feels_like
    }

    return jsonify(weather_info)


if __name__ == '__main__':
    app.run(debug=True)

