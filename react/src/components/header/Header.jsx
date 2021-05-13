import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { SiGoogleearth } from 'react-icons/si';
import { WiDegrees } from 'react-icons/wi';

import { translations } from '../locales/locales';
import { setLocaleAction, updateDegreeUnit } from '../../store/actions';
import Search from '../search/Search';

class Header extends React.Component {
  handleLanguageLinkClick = (e, code) => {
    e.preventDefault();
    const {
      setLocaleAction: dispatchAction,
    } = this.props;

    dispatchAction(code);
  };

  handleUnitClick = (e, unit) => {
    e.preventDefault();
    const {
      lastFetchUrl,
      updateUnitAction,
    } = this.props;
    const url = `${lastFetchUrl}&unit=${unit}`;

    updateUnitAction(unit, url);
  };

  render() {
    const {
      locale,
      currentDegreeUnit,
    } = this.props;
    const degreeIcon = (
      <span className="text-white f-4">
        {currentDegreeUnit}
        <WiDegrees />
      </span>
    );
    const nav = Object.keys(translations).map((code) => (
      <NavDropdown.Item
        href="#"
        key={code}
        active={code === locale}
        onClick={(e) => this.handleLanguageLinkClick(e, code)}
      >
        {translations[code].LANG_TITLE}
      </NavDropdown.Item>
    ));

    const degrees = ['F', 'C'].map((deg) => (
      <NavDropdown.Item
        href="#"
        key={deg}
        active={deg === currentDegreeUnit}
        onClick={(e) => this.handleUnitClick(e, deg)}
      >
        {deg}
        &deg;
      </NavDropdown.Item>
    ));

    return (
      <Navbar className="shadow alpha-dark" expand="lg">
        <div className="navbar-nav nav-left">
          <Navbar.Brand href="/">
            <div className="logo">
              <SiGoogleearth className="text-white f-1" />
              <span>Open Weather</span>
            </div>
          </Navbar.Brand>
        </div>
        <div className="navbar-nav nav-right">
          <Navbar.Toggle className="card alpha shadow m-r-10" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Search />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <NavDropdown
            className="dropdown-menu-right"
            title={<SiGoogleearth className="text-white f-2" />}
            id="collasible-nav-dropdown"
          >
            {nav}
          </NavDropdown>
          <NavDropdown
            className="dropdown-menu-right text-white"
            title={degreeIcon}
            id="collasible-nav-dropdown"
          >
            {degrees}
          </NavDropdown>
        </div>
      </Navbar>
    );
  }
}

Header.propTypes = {
  locale: string.isRequired,
  setLocaleAction: func.isRequired,
  updateUnitAction: func.isRequired,
  currentDegreeUnit: string.isRequired,
  lastFetchUrl: string.isRequired,
};

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
  currentDegreeUnit: state.weatherReducer.currentDegreeUnit,
  lastFetchUrl: state.weatherReducer.lastFetchUrl,
});

const mapDispatchToProps = (dispatch) => ({
  setLocaleAction: (val) => { dispatch(setLocaleAction(val)); },
  updateUnitAction: (unit, url) => { dispatch(updateDegreeUnit(unit, url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
