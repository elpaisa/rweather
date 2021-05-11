import React from 'react';
import { connect } from 'react-redux';
import weatherType from '../../props/weather';

import Week from '../week/Week';
import DayDetail from '../day/DayDetail';

class Highlights extends React.Component {
  render() {
    const {
      weatherData,
    } = this.props;
    const {
      list,
    } = weatherData;

    if (!list) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-sm">
          <DayDetail />
        </div>
        <div className="col-sm">
          <Week weatherData={weatherData} />
        </div>
      </div>
    );
  }
}

Highlights.propTypes = {
  weatherData: weatherType.isRequired,
};

const mapStateToProps = (state) => ({
  weatherData: state.weatherReducer.data.forecast,
  currentDay: state.weatherReducer.data.currentDay,
});

export default connect(mapStateToProps)(Highlights);
