import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Search from '../search/Search';

class Header extends React.Component {
  render() {
    return (
      <Navbar className="shadow alpha" expand="lg">
        <Navbar.Brand href="/">
          <div className="logo">Open Weather</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Search />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect()(withRouter(Header));
