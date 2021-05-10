const path = require('path')
const WeatherController = require('./../controllers/weather.controller')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
  })

  app.get('/favicon.ico', function (req, res) {
    res.writeHead(204, {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age: 604800'
    })

    res.end()
  })

  app.get('/api/v1/forecast', WeatherController.forecast)
}
