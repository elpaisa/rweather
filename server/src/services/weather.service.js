const utils = require('../utils/utils')
const cache = require('./cache.service')
const { OK, NOT_FOUND_MSG, DEFAULT_DEGREE_UNIT } = require('../constants/constants')

module.exports = {
  forecast: async function (
    { zip, city, unit = DEFAULT_DEGREE_UNIT },
    daysOfForecast = process.env.DAYS_OF_FORECAST
  ) {
    const paramName = zip ? 'zip' : 'q'
    const search = zip ? zip.replace(/ /g, '') : city
    const url = process.env.WEATHER_BASE_URL
    const apiKey = process.env.WEATHER_API_KEY
    const units = utils.mapToDegreeUnit(unit)

    try {
      const getCached = await cache.getCache(search)

      if (getCached) {
        return getCached
      }

      const res = await utils.fetch(
        `${url}/forecast?${paramName}=${search}&appid=${apiKey}&units=${units}`
      )

      if (parseInt(res.cod) !== OK) {
        throw Error(NOT_FOUND_MSG)
      }

      const data = utils.formatWeatherData(res, daysOfForecast)

      await cache.setCache(search, data)

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
  locationInfo: async function ({ zip, city, ipAddress, unit }) {
    if (!zip && !city && !ipAddress) {
      return false
    }

    if (!zip && !city) {
      const location = await utils.fetch(
        `${process.env.GEOLOCATE_URL}/${ipAddress}?access_key=${process.env.GEOLOCATE_API_KEY}`
      )

      return { ...location, unit }
    }

    return { zip, city, unit }
  }
}
