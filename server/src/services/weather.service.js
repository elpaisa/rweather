const utils = require('../utils/utils')
const cache = require('./cache.service')
const { OK, NOT_FOUND_MSG } = require('../constants/constants')

module.exports = {
  forecast: async function (
    { code, city },
    daysOfForecast = process.env.DAYS_OF_FORECAST
  ) {
    const search = code || city
    const url = process.env.WEATHER_BASE_URL
    const apiKey = process.env.WEATHER_API_KEY

    try {
      if (process.env.CACHE_HOST) {
        const getCached = await cache.getCache(search)

        if (getCached) {
          return getCached
        }
      }

      const res = await utils.fetch(
        `${url}/forecast?q=${search}&appid=${apiKey}`
      )

      if (parseInt(res.cod) !== OK) {
        throw Error(NOT_FOUND_MSG)
      }

      const data = utils.formatWeatherData(res, daysOfForecast)

      if (process.env.CACHE_HOST) {
        await cache.setCache(search, data)
      }

      return data
    } catch (e) {
      logger.error(e.message)

      throw Error(e.message)
    }
  },
  uvInfo: async function (latitude, longitude) {
    const url = process.env.WEATHER_BASE_URL
    const apiKey = process.env.WEATHER_API_KEY

    try {
      return utils.fetch(
        `${url}/solar_radiation?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
    } catch (e) {
      logger.error(e.message)

      throw Error(e.message)
    }
  },
  locationInfo: async function ({ code, city, ipAddress }) {
    if (!code && !city && !ipAddress) {
      return false
    }

    if (!code && !city) {
      return utils.fetch(
        `${process.env.GEOLOCATE_URL}/${ipAddress}?access_key=${process.env.GEOLOCATE_API_KEY}`
      )
    }

    return { code, city }
  }
}
