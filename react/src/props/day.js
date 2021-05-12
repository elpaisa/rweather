import {
  shape,
  number,
  string,
} from 'prop-types';

const dayType = shape({
  day_of_week: string.isRequired,
  avg_weather: shape({
    id: number.isRequired,
    description: string.isRequired,
    weather_constant: string.isRequired,
    icon: string.isRequired,
    temp_max: number.isRequired,
    temp_min: number.isRequired,
  }),
});

export default dayType;
