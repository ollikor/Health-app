import React from 'react';
import { Component } from 'react';

import { FaWeight } from 'react-icons/fa';

import '../styles/styles.css';

class Home extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <div className="cardContainer">
              <FaWeight className="cardIcon"/>
              <p className="cardTitle">Latest body composition</p>
              <div className="bodyItems">
                <p>Weight - 75kg</p>
                <p>Fat - 30%</p>
                <p>Musle - 40%</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="cardContainer">
              <FaWeight className="cardIcon"/>
              <p className="cardTitle">Latest body composition</p>
              <div className="bodyItems">
                <p>Weight - 75kg</p>
                <p>Fat - 30%</p>
                <p>Musle - 40%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <div className="cardContainer">
              <FaWeight className="cardIcon"/>
              <p className="cardTitle">Latest body composition</p>
              <div className="bodyItems">
                <p>Weight - 75kg</p>
                <p>Fat - 30%</p>
                <p>Musle - 40%</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="cardContainer">
              <FaWeight className="cardIcon"/>
              <p className="cardTitle">Latest body composition</p>
              <div className="bodyItems">
                <p>Weight - 75kg</p>
                <p>Fat - 30%</p>
                <p>Musle - 40%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
