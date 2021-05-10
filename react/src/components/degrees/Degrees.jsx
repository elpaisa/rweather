import React from 'react';
import { number } from 'prop-types';

class Degrees extends React.Component {
  render() {
    const {
      degrees,
    } = this.props;

    return (
      <span>
        {Math.floor(degrees)}
        &deg;
      </span>
    );
  }
}

Degrees.propTypes = {
  degrees: number.isRequired,
};

export default Degrees;
