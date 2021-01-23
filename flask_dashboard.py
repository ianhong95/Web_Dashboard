from flask import Flask, render_template, url_for, request, jsonify
import requests
import json
import datetime

# Define API keys
weather_api_key = 'bca5d952afce81ef1154cef3bb6fedad'
nba_api_key = 'f9fad3b559msh2ee311554352888p14bf29jsn1d94ef843fe4'

nbaGamesByDate = 'https://api-nba-v1.p.rapidapi.com/games/date/'

nbaHeaders = {
    'x-rapidapi-key': "f9fad3b559msh2ee311554352888p14bf29jsn1d94ef843fe4",
    'x-rapidapi-host': "api-nba-v1.p.rapidapi.com"
    }

# Initialize date values
dateNow = datetime.datetime.now().strftime('%Y-%m-%d')
dateTomorrow = (datetime.date.today() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')


app = Flask(__name__)


@app.route('/')
def display_home():
    return render_template('home.html')


@app.route('/', methods=['POST'])
def update():
    inputData = request.json       # Get the input from JS, and store it in a variable to decide which part of the function to execute

    if 'city_id' in inputData:     # Check if a city_id was POSTed
        units = 'metric'

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

    elif 'nba_games' in inputData:

        nba_res = requests.get(f'{nbaGamesByDate}{dateTomorrow}/?rapidapi-key={nba_api_key}')    # Send a request to nba API
        
        nba_json = json.loads(nba_res.content)      # From the response text, load json data

        todayGames = nba_json['api']['games']       # Get json data on all games (collective)

        nbaGamesDict = {}
        gameCounter = 0

        # Filter out info from each game and add to dictionary
        for game in todayGames:
            gameTimeUTC = game['startTimeUTC'][11:16]
            homeTeam = game['hTeam']['shortName']
            awayTeam = game['vTeam']['shortName']
            matchup = homeTeam + ' vs. ' + awayTeam

            nbaGamesDict['Game' + str(gameCounter)] = gameTimeUTC + ' - ' + matchup

            gameCounter += 1

        return jsonify(nbaGamesDict)


if __name__ == '__main__':
    app.run(debug=True)

