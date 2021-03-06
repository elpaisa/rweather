/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  string,
  bool,
  func,
  shape,
} from 'prop-types';

import Highlights from '../highlights/Highlights';
import Week from '../week/Week';
import ErrorComponent from '../error/ErrorComponent';
import Loading from '../loading/Loading';

class Forecast extends React.Component {
  componentDidMount() {
    const {
      history,
    } = this.props;
    window.routerhistory = history;
  }

  componentDidUpdate(prevProps) {
    const {
      route,
    } = prevProps;
    const {
      route: propsRoute,
      history,
    } = this.props;
    if (route !== propsRoute) {
      history.push(propsRoute);
    }
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <Loading />
      );
    }

    return (
      <>
        <Switch>
          <Route exact path="/" component={Highlights} />
          <Route exact path="/forecast" component={Week} />
          <Route exact path="/err" component={ErrorComponent} />
        </Switch>
      </>
    );
  }
}

Forecast.propTypes = {
  route: string.isRequired,
  isLoading: bool.isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  route: state.weatherReducer.currentRoute,
  isLoading: state.weatherReducer.isLoading,
});

export default connect(mapStateToProps)(withRouter(Forecast));
