import getUserLocale from 'get-user-locale';

export const DEFAULT_LANG = 'en';
export const translations = {
  en: {
    LANG_TITLE: 'English',
    LOADING_WEATHER_HOLD_ON: 'Weather info is loading, please hold on...',
    ERROR_IN_API: 'There was an error calling the api, please try again!',
    NOT_FOUND_MSG: 'The place or zip code was not found!',
    INVALID_ZIP_CODE: 'Zip code must be in format `760001,co` = `zip_code,country_code`',
    GHI: 'Global Horizontal Irradiance: ',
    DNI: 'Direct Normal Irradiance, W/m2: ',
    POPULATION: 'Population: ',
    TEMP_MIN: 'Temp min: ',
    TEMP_MAX: 'Temp max: ',
    PRESSURE: 'Pressure: ',
    SEA_LEVEL: 'Sea level: ',
    HUMIDITY: 'Humidity: ',
    MIDNIGHT: 'Midnight',
    EARLY_MORNING: 'Early Morning',
    MORNING: 'Morning',
    MIDMORNING: 'Midmorning',
    NOON: 'Noon',
    AFTERNOON: 'Afternoon',
    SUNSET: 'Sunset',
    NIGHT: 'Night',
    TODAY: 'Today',
    TOMORROW: 'Tomorrow',
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    LANGUAGE: 'Idioma',
  },
  es: {
    LANG_TITLE: 'Español',
    LOADING_WEATHER_HOLD_ON: 'La informacion del clima esta cargando, por favor espere...',
    ERROR_IN_API: 'Hubo un error llamando al servidor!',
    NOT_FOUND_MSG: 'Lugar o codigo postal no encontrado',
    INVALID_ZIP_CODE: 'Codigo postal debe tener este formato: `760001,co` = `codigo postal,codigo pais`',
    GHI: 'Radiacion global horizontal: ',
    DNI: 'Radiacion normal directa, W/m2: ',
    POPULATION: 'Poblacion: ',
    TEMP_MIN: 'Temp min: ',
    TEMP_MAX: 'Temp max: ',
    PRESSURE: 'Presion: ',
    SEA_LEVEL: 'Altura nivel del mar: ',
    HUMIDITY: 'Humedad: ',
    MIDNIGHT: 'Media noche',
    EARLY_MORNING: 'Madrugada',
    MORNING: 'Mañana',
    MIDMORNING: 'Media Mañana',
    NOON: 'Mediodia',
    AFTERNOON: 'Tarde',
    SUNSET: 'Atardecer',
    NIGHT: 'Noche',
    TODAY: 'Hoy',
    TOMORROW: 'Mañana',
    SUNDAY: 'Domingo',
    MONDAY: 'Lunes',
    TUESDAY: 'Martes',
    WEDNESDAY: 'Miercoles',
    THURSDAY: 'Jueves',
    FRIDAY: 'Viernes',
    SATURDAY: 'Sabado',
    LANGUAGE: 'Idioma',
  },
};

export function getSupportedLanguages() {
  return Object.keys(translations).map((k) => (translations[k].LANG_TITLE));
}

export function getDefaultLocale(locale = null) {
  const userLocale = locale || getUserLocale();
  const validLocale = userLocale.split('-')[0];
  const valideKeys = Object.keys(translations);

  return valideKeys.includes(validLocale) ? validLocale : DEFAULT_LANG;
}
