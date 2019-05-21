import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { FaHourglassStart, FaUtensils } from 'react-icons/fa';

import '../styles/styles.css';

import { getRecipes } from '../api';

import AddRecipeModal from './addRecipeModal';
import Card from './card';

import pannukakku from '../images/pannukakku.jpg';

class FoodRecipes extends Component {

  state = {
    addRecipe: false,
    recipes: [],
    modalShow: false,
    onHide: true,
    update: false
  }

  async componentDidMount() {
    const recipes = await getRecipes();
    this.setState({recipes: recipes});
  }

  render() {
    console.log(this.props.update);
    let modalClose = () => this.setState({ modalShow: false });

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
                showDelete={true}
                key={index}
                id={item._id}
                link={`foodRecipes/${item._id}`}
                image={pannukakku}
                title={item.date}
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
  // recipes: state.recipes.recipes,
  // update: state.recipes.update
});

const mapDispatchToProps = dispatch => ({
  // addRecipes: recipes => {dispatch({type: 'ADD_RECIPES', recipes})},
});

export default connect( mapStateToProps, mapDispatchToProps)(FoodRecipes);
