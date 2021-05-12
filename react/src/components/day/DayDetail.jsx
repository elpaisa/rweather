import React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';

import DayHours from './DayHours';
import Icon from '../icon/Icon';
import Degrees from '../degrees/Degrees';
import Loading from '../loading/Loading';
import dayType from '../../props/day';
import weatherType from '../../props/weather';

// eslint-disable-next-line react/prefer-stateless-function
class DayDetail extends React.Component {
  render() {
    const {
      weatherData,
      currentDay,
    } = this.props;
    const {
      city,
      radiation,
    } = weatherData;
    const {
      day_of_week: dayOfWeek,
      avg_weather: avgWeather,
    } = currentDay;
    const {
      name,
      country,
      population,
    } = city;
    const {
      ghi,
      dni,
    } = radiation;

    if (!avgWeather || !name) {
      return <Loading />;
    }

    const {
      temp,
      weather_constant: weather,
      temp_min: tempMin,
      temp_max: tempMax,
      pressure,
      sea_level: seaLevel,
      icon,
      humidity,
    } = avgWeather;
    const CONSTANT_DAY = dayOfWeek.toUpperCase();

    return (
      <div className="detail">
        <div className="card shadow m-t-40 m-b-10 p-20">
          <div className="row">
            <div className="col-sm">
              <h4 className="bold">
                <span className="text-success">
                  <Translate value={CONSTANT_DAY} />
                </span>
              </h4>
              <h4 className="bold">
                {name}
                (
                {country}
                )
              </h4>
              <h1>
                <Icon icon={icon} className="big-icon" />
                <Degrees degrees={temp} />
              </h1>
              <h2><Translate value={weather} /></h2>
            </div>
            <div className="col-sm">
              <ul>
                <li>
                  <h5 className="text-warning">
                    <span>
                      <Translate value="GHI" />
                    </span>
                    {ghi}
                  </h5>
                </li>
                <li>
                  <h5 className="text-danger">
                    <span>
                      <Translate value="DNI" />
                    </span>
                    {dni}
                  </h5>
                </li>
                <li>
                  <span>
                    <Translate value="POPULATION" />
                  </span>
                  {population}
                </li>
                <li>
                  <span>
                    <Translate value="TEMP_MIN" />
                  </span>
                  {tempMin}
                </li>
                <li>
                  <span>
                    <Translate value="TEMP_MAX" />
                  </span>
                  {tempMax}
                </li>
                <li>
                  <span>
                    <Translate value="PRESSURE" />
                  </span>
                  {pressure}
                </li>
                <li>
                  <span>
                    <Translate value="SEA_LEVEL" />
                  </span>
                  {seaLevel}
                </li>
                <li>
                  <span>
                    <Translate value="HUMIDITY" />
                  </span>
                  {humidity}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DayHours day={currentDay} />
      </div>
    );
  }
}

DayDetail.propTypes = {
  currentDay: dayType.isRequired,
  weatherData: weatherType.isRequired,
};

const mapStateToProps = (state) => ({
  weatherData: state.weatherReducer.data.forecast,
  currentDay: state.weatherReducer.data.currentDay,
});

export default connect(mapStateToProps)(DayDetail);
