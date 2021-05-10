const WeatherService = require('../services/weather.service')
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  NOT_FOUND_MSG
} = require('../constants/constants')

module.exports = {
  forecast: async function (req, res) {
    try {
      const location = await WeatherService.locationInfo(req.query)
      const { daysOfForecast } = req.query

      if (!location || (!location.city && !location.code)) {
        throw new Error(
          'ERROR: An ipAddress, city or code needs to be provided'
        )
      }

      const data = await WeatherService.forecast(location, daysOfForecast)

      if (!data.city) {
        throw new Error(
          'ERROR: An unknown error has ocurred trying to retrieve city information'
        )
      }
      const { lat, lon } = data.city.coord

      const uvInfo = await WeatherService.uvInfo(lat, lon)

      return res.send({ status: OK, data: { ...data, ...uvInfo.list[0] } })
    } catch (e) {
      if (e.message === NOT_FOUND_MSG) {
        return res.status(NOT_FOUND).send({
          status: NOT_FOUND,
          message: e.message
        })
      }

      return res
        .status(BAD_REQUEST)
        .send({ status: BAD_REQUEST, message: e.message })
    }
  }
}
