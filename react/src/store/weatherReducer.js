import {
  TYPE_IN_CITYNAME_FIELD,
  TYPE_IN_ZIP_FIELD,
  API_ERROR_MESSAGE,
  RECIEVE_WEATHER_DATA,
  SET_TODAY_WEATHER,
  UPDATE_IS_LOADING,
} from './constants';

const currentDay = {
  date: '',
  day_of_week: '',
  hours: [],
  avg_weather: {
    id: 0,
    main: '',
    description: '',
    weather_constant: '',
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
  isLoading: true,
  userInput: {
    zipValue: '',
    cityValue: '',
  },
  data: {
    callerError: '',
    forecast: {
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
    currentDay,
  },
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case TYPE_IN_CITYNAME_FIELD:
      return {
        ...state,
        currentRoute: '/',
        userInput: {
          ...state.userInputs,
          cityValue: action.cityValue,
        },
      };
    case UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };

    case TYPE_IN_ZIP_FIELD:
      return {
        ...state,
        currentRoute: '/',
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
          currentDay: { ...action.data },
        },
        show: state.data.show,
      };
    case RECIEVE_WEATHER_DATA:
      return {
        ...state,
        currentRoute: '/',
        data: {
          ...state.data,
          callerError: '',
          forecast: { ...action.data },
        },
        show: state.data.show,
      };

    case API_ERROR_MESSAGE:
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
