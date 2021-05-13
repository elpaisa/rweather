import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

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
      <Form inline>
        <InputGroup>
          <FormControl
            type="text"
            className="mr-sm-2 alpha-dark"
            name="cityValue"
            placeholder="City(,code optional)"
            onChange={this.changeHandler}
            onKeyDown={searchCity}
          />
          <FormControl
            className="mr-sm-2 alpha-dark"
            name="zipValue"
            type="text"
            placeholder="760002,co"
            onChange={this.changeHandler}
            onKeyDown={zipHandler}
          />
        </InputGroup>
      </Form>
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
