import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { FaHourglassStart, FaUtensils } from 'react-icons/fa';

import '../styles/styles.css';

import { getRecipes } from '../api';

import AddRecipeModal from './addRecipeModal';
import RemovedModal from './removedModal';
import SavedModal from './savedModal';
import Card from './card';

import food from '../images/food.jpg';

class FoodRecipes extends Component {

  state = {
    addRecipe: false,
    recipes: [],
    modalShow: false,
    onHide: true,
    showRemoved: false,
    showSaved: false,
  }

  componentDidMount() {
    this.update();
  }

  update = async (status) => {
    const recipes = await getRecipes();
    this.setState({recipes: recipes});
    if(status === "saved") {
      this.setState({showSaved: true});
      this.timer();
    }
    if(status === "removed") {
      this.setState({showRemoved: true});
      this.timer();
    }
  }

  timer = () => {
    setTimeout(() => {
      this.setState({showSaved: false, showRemoved: false});
    }, 1000);
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div className="col-sm-12">
        <RemovedModal show={this.state.showRemoved} removed={'Recipe removed'} />
        <SavedModal show={this.state.showSaved} saved={'recipe added'}/>
        <div className="addRecipeContent">
            <button onClick={() => this.setState({modalShow: true})} className="addRecipe">Add recipe</button>
        </div>
        <AddRecipeModal update={() => this.update("saved")} show={this.state.modalShow} onHide={modalClose} />
        <div className="row">
          {
            this.state.recipes.map((item, index) => (
              <Card
                showDelete={true}
                key={index}
                id={item._id}
                link={`foodRecipes/${item._id}`}
                image={food}
                title={item.name}
                firstData={``}
                secondData={`${item.duration} min`}
                thirdData={`${item.portions} portions`}
                iconOne={<FaHourglassStart />}
                iconSecond={<FaUtensils />}
                update={() => this.update("removed")}
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
