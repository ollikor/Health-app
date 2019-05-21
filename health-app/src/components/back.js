import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/styles.css';

import { FaChevronLeft } from 'react-icons/fa';

class Back extends Component {
  render() {
    return (
      <div>
        <NavLink to={this.props.url}>
          <p className="back"><FaChevronLeft /> {this.props.page}</p>
        </NavLink>
      </div>
    );
  }
}

export default Back;
