const nodeFetch = require('node-fetch')

const { TODAY, TOMORROW } = require('../constants/constants')

const fetch = async (url) => {
  const res = await nodeFetch(url)

  return res.json()
}

const isTomorrow = (date) => {
  const today = new Date()
  today.setDate(new Date().getDate() + 1)
  const tomorrow = today.toISOString().split('T')[0]

  return date === tomorrow ? TOMORROW : date
}

const isToday = (date) => {
  const d = new Date(date)
  const today = new Date()
  const isDateToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()

  return isDateToday ? TODAY : isTomorrow(date)
}

const validateZip = (code) => {
  if (!code) {
    return;
  }

  const s = code.replace(/ /g, '').split(',');

  if (s.length !== 2) {
    throw new Error("Zip code must be in format `760001,co` = `zip_code,country_code`")
  }
};

const getNextDays = (numberOfDays) => {
  const days = []

  for (let i = 0; i <= numberOfDays; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const d = date.toISOString()
    days.push(d.split('T')[0])
  }

  return days
}

const getDayOfTheWeekFromISODate = (dateStr) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const date = new Date(dateStr)
  const dateIsToday = isToday(dateStr)

  if (dateIsToday !== dateStr) {
    return dateIsToday
  }

  return days[date.getDay()]
}

const getAverageWeather = (hours) => {
  const ocurrences = hours.map((h) => h.description)
  const avgWeather = ocurrences
    .sort(
      (a, b) =>
        ocurrences.filter((v) => v === a).length -
        ocurrences.filter((v) => v === b).length
    )
    .pop()

  return hours.filter((d) => d.description === avgWeather)[0]
}

function capitalizeWords (string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })
}

const formatWeatherData = (data, daysOfForecast) => {
  const weatherDays = {}
  const days = getNextDays(daysOfForecast)
  data.list.forEach((d) => {
    const { dt_txt: dateTimeStr, weather, main } = d
    const dateTime = dateTimeStr.split(' ')
    const date = dateTime[0]
    const hour = dateTime[1]

    if (days.includes(date)) {
      if (!weatherDays[date]) {
        weatherDays[date] = {
          date,
          day_of_week: getDayOfTheWeekFromISODate(date),
          hours: []
        }
      }
      const description = capitalizeWords(weather[0].description)
      const icon = `${process.env.WEATHER_ICONS}/${weather[0].icon}@2x.png`

      weatherDays[date].hours.push({
        ...weather[0],
        hour,
        icon,
        description,
        ...main
      })
      const avgWeather = getAverageWeather(weatherDays[date].hours)
      weatherDays[date].avg_weather = avgWeather
    }
  })
  const list = Object.keys(weatherDays).map((d) => weatherDays[d])

  return { ...data, list }
}

module.exports = { fetch, formatWeatherData, validateZip }
