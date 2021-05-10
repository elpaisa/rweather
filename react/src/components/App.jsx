import React from 'react';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

import ForeCast from './forecast/Forecast';
import Header from './header/Header';
import Footer from './footer/Footer';

import { getDefaultForecast } from '../store/actions';

class App extends React.Component {
  async componentDidMount() {
    await getDefaultForecast(this);
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <ForeCast />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
