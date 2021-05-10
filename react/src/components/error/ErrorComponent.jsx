import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

class Icon extends React.Component {
  render() {
    return (
      <Jumbotron className="card p-50 m-50 shadow alpha">
        <h1>
          There was an error calling the api, please try again!
        </h1>
      </Jumbotron>
    );
  }
}

export default Icon;
