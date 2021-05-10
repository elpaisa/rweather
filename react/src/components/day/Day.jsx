/* eslint-disable import/named */
import React from 'react';
import { connect } from 'react-redux';

import { setTodayData } from '../../store/actions';
import dayType from '../../props/day';

import Degrees from '../degrees/Degrees';
import Icon from '../icon/Icon';

class Day extends React.Component {
  showDay = () => {
    const {
      day,
    } = this.props;

    setTodayData(day);
  }

  render() {
    const {
      day,
    } = this.props;
    const {
      day_of_week: dayOfWeek,
      avg_weather: avgWeather,
    } = day;
    const {
      id,
      description,
      icon,
      temp_max: tempMax,
      temp_min: tempMin,
    } = avgWeather;

    return (
      <div
        className="pointer card shadow alpha-dark text-white p-10 m-10"
        onClick={this.showDay}
        onKeyDown={this.showDay}
        role="button"
        tabIndex={id}
      >
        <div className="row">
          <div className="col-6 text-left">
            <Icon icon={icon} className="small-icon" />
            <span className="highlight">{dayOfWeek}</span>
            <br />
            <span>{description}</span>
          </div>
          <div className="col-6 text-right">
            <h3 className="highlight">
              <Degrees degrees={tempMax} />
            </h3>
            <span>
              <Degrees degrees={tempMin} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Day.propTypes = {
  day: dayType.isRequired,
};

const mapStateToProps = (state) => ({
  weatherData: state.data.forecast,
  currentDay: state.data.currentDay,
});

export default connect(mapStateToProps)(Day);
