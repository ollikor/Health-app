import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { FaHourglassStart, FaUtensils } from 'react-icons/fa';
import tortilla from '../images/tortilla.jpg';
import pannukakku from '../images/pannukakku.jpg';

import '../styles/styles.css';
import AddRecipe from './addRecipe';

class FoodRecipes extends Component {

  state = {
    addRecipe: false
  }

  render() {
    return (
      <div className="col-sm-12">
        <div className="addRecipeContent">
          {/* <NavLink to={`/foodRecipes/${'addRecipe'}`}> */}
            <button onClick={() => this.setState({addRecipe: !this.state.addRecipe})} className="addRecipe">Add recipe</button>
          {/* </NavLink> */}
        </div>
        { this.state.addRecipe ?
          <AddRecipe />
        : null }
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <div className="recipesCardContainer">
              <img className="recipesCardImage" src={tortilla} alt="tortilla" />
              <p className="recipesCardTitle">Meksikolainen tortilla</p>
              <div className="recipesBodyItems">
                <p>30min <FaHourglassStart /></p>
                <p>8 annosta <FaUtensils /></p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <NavLink className="navLinkSecond" to={`/foodRecipes/${'recipe'}`}>
              <div className="recipesCardContainer">
                <img className="recipesCardImage" src={pannukakku} alt="pannukakku" />
                <p className="recipesCardTitle">Pannukakku</p>
                <div className="recipesBodyItems">
                  <p>45 min <FaHourglassStart /></p>
                  <p>4 annosta <FaUtensils /></p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodRecipes;