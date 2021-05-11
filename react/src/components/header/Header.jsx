import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { SiGoogleearth } from 'react-icons/si';

import { translations } from '../locales/locales';
import { setLocaleAction } from '../../store/actions';
import Search from '../search/Search';

class Header extends React.Component {
  handleLanguageLinkClick = (e, code) => {
    e.preventDefault();
    const {
      setLocaleAction: dispatchAction,
    } = this.props;

    dispatchAction(code);
  };

  render() {
    const {
      locale,
    } = this.props;
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

    return (
      <Navbar className="shadow alpha-dark" expand="lg">
        <Navbar.Brand href="/">
          <div className="logo">
            <SiGoogleearth className="text-white f-1" />
            <span>Open Weather</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle className="card alpha shadow m-r-10" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Search />
          </Nav>
        </Navbar.Collapse>
        <NavDropdown title={<SiGoogleearth className="text-white f-2" />} id="collasible-nav-dropdown">
          {nav}
        </NavDropdown>
      </Navbar>
    );
  }
}

Header.propTypes = {
  locale: string.isRequired,
  setLocaleAction: func.isRequired,
};

const mapStateToProps = (state) => ({ locale: state.i18n.locale });

const mapDispatchToProps = (dispatch) => ({
  setLocaleAction: (val) => { dispatch(setLocaleAction(val)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
