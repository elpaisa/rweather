import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Jumbotron from 'react-bootstrap/Jumbotron';

class ErrorComponent extends React.Component {
  render() {
    const {
      callerError,
    } = this.props;

    const msg = callerError || 'There was an error calling the api, please try again!';
    return (
      <Jumbotron className="card p-50 m-50 shadow alpha">
        <h1>
          {msg}
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
  callerError: state.data.callerError,
});

export default connect(mapStateToProps)(ErrorComponent);
