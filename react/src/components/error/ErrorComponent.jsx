import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Translate } from 'react-redux-i18n';

import Jumbotron from 'react-bootstrap/Jumbotron';

class ErrorComponent extends React.Component {
  render() {
    const {
      callerError = 'ERROR_IN_API',
    } = this.props;

    return (
      <Jumbotron className="card p-50 m-50 shadow alpha">
        <h1>
          <Translate value={callerError} />
        </h1>
      </Jumbotron>
    );
  }
}

ErrorComponent.propTypes = {
  callerError: string,
};

ErrorComponent.defaultProps = {
  callerError: '',
};

const mapStateToProps = (state) => ({
  callerError: state.weatherReducer.data.callerError,
});

export default connect(mapStateToProps)(ErrorComponent);
