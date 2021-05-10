# WEATHER APPLICATION nodejs, react - redux with cached responses

## Version details
1. Uses nodejs v14
2. React with redux
3. Redis to cache

## To Run the application you need set the .env file in the application root
```
  PORT=8001
  WEATHER_API_KEY=YOUR_API_KEY
  WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
  WEATHER_ICONS=http://openweathermap.org/img/wn
  GEOLOCATE_URL=http://api.ipstack.com
  GEOLOCATE_API_KEY=YOUR_API_KEY
  DAYS_OF_FORECAST=5
  PUBLIC_URL=http://localhost:3000
  CACHE_HOST='127.0.0.1'
  CACHE_HOST=6379
  CACHE_TTL_MINUTES=60
```

## To Run the application on Development
```
cd server
npm i
npm run init
npm run start

cd react
npm run start

Open your web browser to http://localhost:3000/
```


## To Run the application with Docker
1. Install Docker https://www.docker.com/community-edition#/download
2. Run these commands:
```
docker build -t weather-app .
docker run -it -p 8001:8001 weather-app
```
## Application screenshot

![Screenshot of the app](/react-screen.png?raw=true "DEMO")
