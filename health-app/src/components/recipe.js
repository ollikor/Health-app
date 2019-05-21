import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { FaHourglassStart, FaUtensils, FaGripfire, FaTrash } from 'react-icons/fa';
import pannukakku from '../images/pannukakku.jpg';
import DeleteModal from './deleteModal';
import Back from './back';

import { getRecipe, getRecipes } from '../api';

import '../styles/styles.css';

class FoodRecipes extends Component {

  state = {
    recipe: '',
    modalShow: false,
    onHide: true,
    update: false
  }

  async componentDidMount() {
    console.log(this.props.update);
    console.log(this.props.match.params);
    const recipe = await getRecipe(this.props.match.params.id);
    this.setState({recipe: recipe});
    // const recipes = this.props.recipes;
    // const recipe = recipes.find(recipe => recipe._id === this.props.match.params.id);
    // this.setState({recipe: recipe});
  }

  // update = () => {
  //   console.log('recipe');
  //   this.props.update();
  // }

  recipe = () => {
    let modalClose = () => this.setState({ modalShow: false });
    const recipe = this.state.recipe;
    return(
      <div className="recipesCardContainer">
        <div onClick={() => this.setState({modalShow: true})} className="recipeDeleteIconContent">
          <FaTrash />
        </div>
        <DeleteModal
          // update={() => this.update()}
          title={'Remove recipe'}
          description={"Are you sure that you want to remove this recipe?"}
          url={'recipes/'}
          move={'/foodRecipes'}
          id={recipe._id}
          show={this.state.modalShow}
          onHide={modalClose}
        />
        <img className="recipeCardImage" src={pannukakku} alt="pannukakku" />
        <p className="recipesCardTitle">{recipe.name}</p>
        <div className="row justify-content-center">
          <div className="col-sm-4 recipeBodyItems">
            <ul className="list">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
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
            <p className="infoItem">{recipe.portions} annosta <FaUtensils /></p>
            <p className="infoItem">{recipe.temperature}° <FaGripfire /></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.state.recipe);
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

const mapStateToProps = state => ({
  recipes: state.recipes.recipes
});

export default connect(mapStateToProps)(FoodRecipes);
