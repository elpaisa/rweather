import React from 'react';
import { Translate } from 'react-redux-i18n';

import Jumbotron from 'react-bootstrap/Jumbotron';

class Loading extends React.Component {
  render() {
    return (
      <Jumbotron className="card p-50 m-50 shadow alpha">
        <h1>
          <Translate value="LOADING_WEATHER_HOLD_ON" />
        </h1>
      </Jumbotron>
    );
  }
}

export default Loading;
