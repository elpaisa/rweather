import {
  shape,
  number,
  string,
  arrayOf,
} from 'prop-types';

import dayType from './day';

const weatherType = shape({
  city: shape({
    id: number,
    name: string,
    country: string,
    population: number,
    sunrise: number,
    sunset: number,
  }).isRequired,
  radiation: shape({
    ghi: number,
    dni: number,
    dhi: number,
    ghi_cs: number,
    dni_cs: number,
    dhi_cs: number,
  }).isRequired,
  list: arrayOf(dayType).isRequired,
});

export default weatherType;
