import {
  TYPE_IN_CITYNAME_FIELD,
  TYPE_IN_ZIP_FIELD,
  THROW_CALLER_ERROR,
  RECIEVE_WEATHER_DATA,
  SET_TODAY_WEATHER,
} from './constants';

export const darkTheme = {
  name: 'nighttime',
  foregroundColor: 'white',
  backgroundColor: '#2d2d2d',
  sunColor: '#f8b62d',
};

const currentDay = {
  date: '',
  day_of_week: '',
  hours: [],
  avg_weather: {
    id: 0,
    main: '',
    description: '',
    icon: '',
    hour: '',
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    sea_level: 0,
    humidity: '',
  },
};

export const initialState = {
  currentRoute: '/',
  theme: darkTheme,
  userInput: {
    zipValue: '',
    cityValue: '',
  },
  data: {
    callerError: false,
    forecast: {
      data: {
        list: [],
        city: {
          id: 0,
          name: null,
          coord: {
            lat: 0,
            lon: 0,
          },
          country: '',
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0,
        },
        radiation: {
          ghi: 0,
          dni: 0,
          dhi: 0,
          ghi_cs: 0,
          dni_cs: 0,
          dhi_cs: 0,
        },
      },
    },
    currentDay: {
      data: currentDay,
    },
  },
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TYPE_IN_CITYNAME_FIELD:
      return {
        ...state,
        userInput: {
          ...state.userInputs,
          cityValue: action.cityValue,
        },
      };

    case TYPE_IN_ZIP_FIELD:
      return {
        ...state,
        userInput: {
          ...state.userInputs,
          zipValue: action.zipValue,
        },
      };

    case SET_TODAY_WEATHER:
      return {
        ...state,
        currentRoute: '/',
        data: {
          ...state.data,
          callerError: false,
          currentDay: {
            data: { ...action.data },
          },
        },
        show: state.data.show,
      };
    case RECIEVE_WEATHER_DATA:
      return {
        ...state,
        currentRoute: '/',
        data: {
          ...state.data,
          callerError: false,
          forecast: {
            data: { ...action.data },
          },
        },
        show: state.data.show,
      };

    case THROW_CALLER_ERROR:
      return {
        ...initialState,
        currentRoute: '/err',
        data: {
          ...state.data,
          callerError: action.error,
        },
      };

    default:
      return state;
  }
}
