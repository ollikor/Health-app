import React from 'react';
import { Component } from 'react';

import { FaHourglassStart, FaUtensils, FaGripfire, FaTrash } from 'react-icons/fa';
import food from '../images/food.jpg';
import Back from './back';

import { getRecipe } from '../api';

import '../styles/styles.css';

class FoodRecipes extends Component {

  state = {
    recipe: '',
    modalShow: false,
    onHide: true,
    update: false
  }

  async componentDidMount() {
    const recipe = await getRecipe(this.props.match.params.id);
    this.setState({recipe: recipe});
  }

  recipe = () => {
    const recipe = this.state.recipe;
    return(
      <div className="recipesCardContainer">
        <div onClick={() => this.setState({modalShow: true})} className="recipeDeleteIconContent">
          <FaTrash />
        </div>
        <img className="recipeCardImage" src={food} alt="food" />
        <p className="recipesCardTitle">{recipe.name}</p>
        <div className="row justify-content-center">
          <div className="col-sm-4 recipeBodyItems">
            <ul className="list">
              {recipe.ingredients.map((item, index) => (
                <li className="listItem" key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4 recipeBodyItems">
            <p>{recipe.description}</p>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="row justify-content-center">
            <p className="infoItem">{recipe.duration} min <FaHourglassStart /></p>
            <p className="infoItem">{recipe.portions} portions <FaUtensils /></p>
            <p className="infoItem">{recipe.temperature}° <FaGripfire /></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="col-sm-12">
        <Back url={"/foodRecipes"} page={"Foodrecipes"} />
        <div className="row justify-content-center">
          <div className="col-sm-8 recipeContainer">
          {this.state.recipe !== undefined && this.state.recipe !== '' ?
            this.recipe()
          :null}
          </div>
        </div>
      </div>
    );
  }
}

export default FoodRecipes;
