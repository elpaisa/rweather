import React from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';

import Icon from '../icon/Icon';
import DayHours from './DayHours';
import Degrees from '../degrees/Degrees';
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
    const {
      temp,
      description,
      temp_min: tempMin,
      temp_max: tempMax,
      pressure,
      sea_level: seaLevel,
      icon,
      humidity,
    } = avgWeather;

    return (
      <Container className="detail">
        <div className="card shadow m-t-40 m-b-10 p-20">
          <div className="row">
            <div className="col-sm">
              <h4 className="bold">
                <span className="text-success">{dayOfWeek}</span>
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
              <h2>{description}</h2>
            </div>
            <div className="col-sm">
              <ul>
                <li>
                  <h5 className="text-warning">
                    <span>Global Horizontal Irradiance: </span>
                    {ghi}
                  </h5>
                </li>
                <li>
                  <h5 className="text-danger">
                    <span>Direct Normal Irradiance, W/m2: </span>
                    {dni}
                  </h5>
                </li>
                <li>
                  <span>Population: </span>
                  {population}
                </li>
                <li>
                  <span>Temp min: </span>
                  {tempMin}
                </li>
                <li>
                  <span>Temp max: </span>
                  {tempMax}
                </li>
                <li>
                  <span>Pressure: </span>
                  {pressure}
                </li>
                <li>
                  <span>Sea level: </span>
                  {seaLevel}
                </li>
                <li>
                  <span>Humidity: </span>
                  {humidity}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DayHours day={currentDay} />
      </Container>
    );
  }
}

DayDetail.propTypes = {
  currentDay: dayType.isRequired,
  weatherData: weatherType.isRequired,
};

const mapStateToProps = (state) => ({
  weatherData: state.data.forecast.data,
  currentDay: state.data.currentDay.data,
});

export default connect(mapStateToProps)(DayDetail);
