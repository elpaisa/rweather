import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import weatherType from '../../props/weather';

import Day from '../day/Day';

class Week extends React.Component {
  expandDay = (clickedDay) => {
    const {
      expandedDay,
    } = this.state;
    this.setState({ expandedDay: expandedDay ? null : clickedDay });
  };

  render() {
    const {
      weatherData = {},
    } = this.props;
    const {
      list,
    } = weatherData;

    if (!list) {
      return null;
    }

    const days = list.map((day) => {
      const idx = Math.random(1000);

      return (
        <Day
          key={idx}
          weatherData={weatherData}
          day={day}
          expandDay={this.expandDay}
        />
      );
    });

    return (
      <CSSTransition timeout={500}>
        <div className="scroll week">{days}</div>
      </CSSTransition>
    );
  }
}

Week.propTypes = {
  weatherData: weatherType.isRequired,
};

const mapStateToProps = (state) => ({
  weatherData: state.data.forecast.data,
});

export default connect(mapStateToProps)(Week);
