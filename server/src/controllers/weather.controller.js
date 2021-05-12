const utils = require('../utils/utils')
const WeatherService = require('../services/weather.service')
const {
  NOT_FOUND_MSG
} = require('../constants/constants')

module.exports = {
  forecast: async function (req, res) {
    try {
      const location = await WeatherService.locationInfo(req.query)
      const { daysOfForecast } = req.query

      if (!location || (!location.city && !location.zip)) {
        throw new Error(
          'ERROR: An ipAddress, city or zip needs to be provided'
        )
      }

      utils.validateZip(location.zip)

      const data = await WeatherService.forecast(location, daysOfForecast)

      if (!data.city) {
        throw new Error(
          'ERROR: An unknown error has ocurred trying to retrieve city information'
        )
      }
      const { lat, lon } = data.city.coord

      const uvInfo = await WeatherService.uvInfo(lat, lon)

      return res.ok({ ...data, ...uvInfo.list[0] })
    } catch (e) {
      if (e.message === NOT_FOUND_MSG) {
        return res.notFound()
      }

      return res.badRequest(e.message)
    }
  }
}
