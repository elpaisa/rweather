import React from 'react';

import PropTypes from 'prop-types';

class Icon extends React.Component {
  render() {
    const {
      icon,
      className,
    } = this.props;

    return (
      <img
        src={icon}
        alt="Weather representation"
        className={className}
      />
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Icon;
