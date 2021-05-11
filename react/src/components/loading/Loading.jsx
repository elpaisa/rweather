import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

class Loading extends React.Component {
  render() {
    return (
      <Jumbotron className="card p-50 m-50 shadow alpha">
        <h1>
          Weather info is loading, hold on...
        </h1>
      </Jumbotron>
    );
  }
}

export default Loading;
