import React from 'react';
import { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import '../styles/styles.css';

class Navigation extends Component {
  render(){
    return (
      <Navbar className="navbar navbar-light bg-light" expand="lg">
        <Navbar.Brand>Health App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink className="navLink" to="/home">Home</NavLink>
            <NavLink className="navLink" to="/bodyComposition">Body composition</NavLink>
            <NavLink className="navLink" to="/foodRecipes">Food recipes</NavLink>
            <NavLink className="navLink" to="/youtubeVideos">Youtube videos</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
