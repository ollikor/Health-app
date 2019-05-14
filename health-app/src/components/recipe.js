import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { FaHourglassStart, FaUtensils, FaGripfire, FaTrash } from 'react-icons/fa';
import pannukakku from '../images/pannukakku.jpg';
import DeleteModal from './deleteModal';

import '../styles/styles.css';

class FoodRecipes extends Component {

  state = {
    recipe: '',
    modalShow: false,
    onHide: true,
    update: false
  }

  componentDidMount() {
    const recipes = this.props.recipes;
    const recipe = recipes.find(recipe => recipe._id === this.props.match.params.id);
    this.setState({recipe: recipe});
  }

  recipe = () => {
    let modalClose = () => this.setState({ modalShow: false });
    const recipe = this.state.recipe;
    return(
      <div className="recipesCardContainer">
        <div onClick={() => this.setState({modalShow: true})} className="recipeDeleteIconContent">
          <FaTrash />
        </div>
        <DeleteModal
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
    return (
      <div className="col-sm-12">
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
