import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../store/store';

import { typeZip, typeCity } from '../../store/actions';

class SearchBar extends React.Component {
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      searchCity,
      zipHandler,
    } = this.props;

    return (
      <form className="ml-auto form-inline">
        <div className="row">
          <div className="col-sm">
            <input
              className="form-control"
              name="cityValue"
              type="text"
              placeholder="Search City Name"
              onChange={this.changeHandler}
              onKeyDown={searchCity}
            />
          </div>
          <div className="col-sm">
            <input
              className="form-control"
              name="zipValue"
              type="number"
              placeholder="Search Zip"
              onChange={this.changeHandler}
              onKeyDown={zipHandler}
            />
          </div>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  zipHandler: PropTypes.func.isRequired,
  searchCity: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  searchCity: (evt) => store.dispatch(typeCity(evt)),
  zipHandler: (evt) => store.dispatch(typeZip(evt)),
});

export default connect(mapDispatchToProps)(SearchBar);
