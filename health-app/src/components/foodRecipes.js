import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { FaHourglassStart, FaUtensils } from 'react-icons/fa';

import pannukakku from '../images/pannukakku.jpg';

import '../styles/styles.css';

import AddRecipeModal from './addRecipeModal';
import Card from './card';

class FoodRecipes extends Component {

  state = {
    addRecipe: false,
    recipes: [],
    modalShow: false,
    onHide: true,
    update: false
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = () => {
    let recipes = [];

    const url = 'http://localhost:8000/recipes';
    axios.get(url)
    .then( (response) => {
      console.log(response);
        response.data.forEach((bodyData) => {
          recipes.push(bodyData);
        });
        this.setState({
          recipes: recipes
        })
        //this.props.addRecipes(recipes);
    })
    .catch(function(error){
        console.log(error);
    });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    const {
      recipes
    } = this.props;

    return (
      <div className="col-sm-12">
        <div className="addRecipeContent">
            <button onClick={() => this.setState({modalShow: true})} className="addRecipe">Add recipe</button>
        </div>
        <AddRecipeModal show={this.state.modalShow} onHide={modalClose} />
        <div className="row">
          {
            this.state.recipes.map((item, index) => (
              <Card
                key={index}
                link={`foodRecipes/${item._id}`}
                image={pannukakku}
                title={item.name}
                firstData={``}
                secondData={`${item.duration} min`}
                thirdData={`${item.portions} portions`}
                iconOne={<FaHourglassStart />}
                iconSecond={<FaUtensils />}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  update: state.recipes.update
});

const mapDispatchToProps = dispatch => ({
  addRecipes: recipes => {dispatch({type: 'ADD_RECIPES', recipes})},
});

export default connect( mapStateToProps, mapDispatchToProps)(FoodRecipes);
