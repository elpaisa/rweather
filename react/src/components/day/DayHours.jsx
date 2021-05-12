import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Translate } from 'react-redux-i18n';

import dayType from '../../props/day';

import Icon from '../icon/Icon';
import Degrees from '../degrees/Degrees';

class DayHours extends React.Component {
  hours = {
    '00:00:00': 'MIDNIGHT',
    '03:00:00': 'EARLY_MORNING',
    '06:00:00': 'MORNING',
    '09:00:00': 'MIDMORNING',
    '12:00:00': 'NOON',
    '15:00:00': 'AFTERNOON',
    '18:00:00': 'SUNSET',
    '21:00:00': 'NIGHT',
  };

  mapHourToString(hour) {
    return this.hours[hour];
  }

  render() {
    const {
      currentDay,
    } = this.props;
    const {
      hours,
    } = currentDay;
    const cards = hours.map((h) => {
      const idx = Math.random(1000);
      const {
        main,
        icon,
        hour,
        temp,
      } = h;
      const timeDef = this.mapHourToString(hour) || hour;

      return (
        <div key={idx} className="col-sm m-b-10">
          <Card className="m-w-150 text-center shadow alpha-dark">
            <span className="bold">
              <Translate value={timeDef} />
            </span>
            <Icon icon={icon} className="img-center big-icon" />
            <Degrees degrees={temp} />
            <br />
            <span className="bold"><Translate value={main.toUpperCase()} /></span>
          </Card>
        </div>
      );
    });

    return <div className="row">{cards}</div>;
  }
}

DayHours.propTypes = {
  currentDay: dayType.isRequired,
};

const mapStateToProps = (state) => ({
  currentDay: state.weatherReducer.data.currentDay,
});

export default connect(mapStateToProps)(DayHours);
