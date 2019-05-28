import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

import { FaTrash } from 'react-icons/fa';

import DeleteModal from './deleteModal';


class Card extends Component {

  state = {
    recipe: '',
    modalShow: false,
    onHide: true,
    update: false
  }

  update = () => {
    this.props.update();
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    const {
      id,
      link,
      image,
      alt,
      title,
      firstData,
      secondData,
      thirdData,
      iconOne,
      iconSecond,
      showDelete
     } = this.props;

    return (
      <div className="col-sm-12 col-md-8 col-lg-4">
        <DeleteModal
          title={'Remove recipe'}
          description={"Are you sure that you want to remove this recipe?"}
          url={'recipes/'}
          move={'/foodRecipes'}
          id={id}
          show={this.state.modalShow}
          onHide={modalClose}
          update={() => this.update()}
        />
        <div className="cardContainer">
          {showDelete ?
          <div onClick={() => this.setState({modalShow: true})} className="recipeDeleteIconContent">
            <FaTrash />
          </div>:null}
          <NavLink className="navLinkCard" to={`/${link}`}>
              <img className="cardImage" src={image} alt={alt} />
              <p className="cardTitle">{title}</p>
              <div>
                <p>{firstData}</p>
                <p>{secondData} {iconOne}</p>
                <p>{thirdData} {iconSecond}</p>
              </div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Card;
