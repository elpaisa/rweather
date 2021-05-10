import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';

import dayType from '../../props/day';

import Icon from '../icon/Icon';
import Degrees from '../degrees/Degrees';

class DayHours extends React.Component {
  hours = {
    '00:00:00': 'Midnight',
    '03:00:00': 'Early Morning',
    '06:00:00': 'Morning',
    '09:00:00': 'Midmorning',
    '12:00:00': 'Noon',
    '15:00:00': 'Afternoon',
    '18:00:00': 'Sunset',
    '21:00:00': 'Night',
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
          <Card className="text-center shadow alpha">
            <span className="bold">{timeDef}</span>
            <Icon icon={icon} className="img-center big-icon" />
            <Degrees degrees={temp} />
            <br />
            <span>{main}</span>
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
  currentDay: state.data.currentDay.data,
});

export default connect(mapStateToProps)(DayHours);
