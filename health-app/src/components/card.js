import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';


class Cards extends Component {
  render() {

    const {
      link,
      image,
      alt,
      title,
      firstData,
      secondData,
      thirdData,
      iconOne,
      iconSecond
     } = this.props;

    return (
      <div className="col-sm-12 col-md-8 col-lg-4">
        <NavLink className="navLinkCard" to={`/${link}`}>
          <div className="cardContainer">
            <img className="cardImage" src={image} alt={alt} />
            <p className="cardTitle">{title}</p>
            <div>
              <p>{firstData}</p>
              <p>{secondData} {iconOne}</p>
              <p>{thirdData} {iconSecond}</p>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Cards;
