import { setLocale } from 'react-redux-i18n';
import publicIp from 'public-ip';
import store from './store';
import {
  DAYS_OF_FORECAST,
  TYPE_IN_CITYNAME_FIELD,
  TYPE_IN_ZIP_FIELD,
  RECIEVE_WEATHER_DATA,
  SET_TODAY_WEATHER,
  API_ERROR_MESSAGE,
  SEARCH_BY_ZIP,
  SEARCH_BY_CITY,
  API_URL,
} from './constants';

export async function getClientIp(component) {
  const ipAddress = await publicIp.v4({
    fallbackUrls: ['https://ifconfig.co/ip'],
  });

  component.setState({
    ipAddress,
  });

  return ipAddress;
}

export function processErrorMessage(error) {
  return store.dispatch({
    type: API_ERROR_MESSAGE,
    error,
  });
}

export function receiveWeatherData(data) {
  return store.dispatch({
    type: RECIEVE_WEATHER_DATA,
    data,
  });
}

export function setTodayData(data) {
  return store.dispatch({
    type: SET_TODAY_WEATHER,
    data,
  });
}

export async function getForecast(url) {
  let res;
  try {
    res = await fetch(url);
    const data = await res.json();

    if (data.status !== 200) {
      throw new Error(data.message);
    }
    const currentDay = data.data.list.filter(
      (d) => d.day_of_week === 'Today',
    )[0] || data.data.list[0];

    setTodayData(currentDay);
    receiveWeatherData(data.data);
  } catch (e) {
    processErrorMessage(e.message);
  }

  return res;
}

export async function getDefaultForecast(component) {
  const ipAddress = await getClientIp(component);
  const url = `${API_URL}/forecast?ipAddress=${ipAddress}&daysOfForecast=${DAYS_OF_FORECAST}`;

  return getForecast(url);
}

export async function searchCity(searchType, value) {
  const paramName = searchType === SEARCH_BY_ZIP ? 'zip' : 'city';
  const url = `${API_URL}/forecast?${paramName}=${value}&daysOfForecast=${DAYS_OF_FORECAST}`;

  return getForecast(url);
}

export function typeZip(e) {
  if (e.keyCode === 13 && e.target.value.trim().length > 3) {
    searchCity(SEARCH_BY_ZIP, encodeURIComponent(e.target.value));
  }

  return store.dispatch({
    type: TYPE_IN_ZIP_FIELD,
    zipValue: e.target.value,
  });
}

export function typeCity(e) {
  if (e.keyCode === 13 && e.target.value.trim().length > 3) {
    searchCity(SEARCH_BY_CITY, encodeURIComponent(e.target.value));
  }
  return store.dispatch({
    type: TYPE_IN_CITYNAME_FIELD,
    cityValue: e.target.value,
  });
}

export function setLocaleAction(locale) {
  return (dispatch) => dispatch(setLocale(locale));
}
