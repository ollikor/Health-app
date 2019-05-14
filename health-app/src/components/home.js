import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import '../styles/styles.css';
import { FaHourglassStart, FaUtensils } from 'react-icons/fa';

import pannukakku from '../images/pannukakku.jpg';
import body from '../images/body.jpg';
import video from '../images/video.jpg';
import exercise from '../images/exercise.jpg';

import getBodyComposition from '../axios/bodyComposition';

import Card from './card';

class Home extends Component {

  state = {
    recipes: [],
    lastRecipe: {},
    lastData: {},
    weight: [],
    fat: [],
    fatkg: [],
    muscle: [],
    date: []
  }

  componentDidMount(){
    this.getRecipes();
    this.getBodyComposition();
  }

  getRecipes = () => {
    let recipes = [];
    let id;
    let name;
    let duration;
    let portions;

    const url = 'http://localhost:8000/recipes';
    axios.get(url)
    .then( (response) => {
        console.log(response);
        // console.log(response.data.file);
        const length = response.data.length - 1;
        const lastData = response.data[length];
        // console.log(lastData);
        response.data.forEach((bodyData) => {
          recipes.push(bodyData);
          id = bodyData._id;
          name = bodyData.name;
          duration = bodyData.duration;
          portions = bodyData.portions;
        });
        if (recipes.length > 0) {
          const object = {
            _id: lastData._id,
            name: lastData.name,
            duration: lastData.duration,
            portions: lastData.portions
          }
          this.setState({
            // recipes: recipes,
            lastRecipe: object
          })
        }
        // this.props.addRecipes(recipes);
    })
    .catch(function(error){
        console.log(error);
    });
  }

  getBodyComposition = () => {
    const weight = [];
    const fat = [];
    const fatkg = [];
    const muscle = [];
    const date = [];
    let data = null;

    const url = 'http://localhost:8000/';
    axios.get(url)
    .then( (response) => {
        console.log(response);
        const length = response.data.length - 1;
        const lastData = response.data[length];
        response.data.forEach((bodyData) => {
            data = bodyData;
            weight.push(parseFloat(bodyData.weight));
            fat.push(parseFloat(bodyData.fat));
            fatkg.push(parseFloat(bodyData.fatkg));
            muscle.push(parseFloat(bodyData.muscle));
            date.push(bodyData.date);
        });
        if(data !== null) {
          this.setState({
            lastData: lastData,
            weight: weight,
            fat: fat,
            fatkg: fatkg,
            muscle: muscle,
            date: date
          })
        }
        // this.props.addBody(weight, fat, fatkg, muscle, date);
    })
    .catch(function(error){
        console.log(error);
    });
  }

  render() {

    const {
      lastData,
      lastRecipe
    } = this.state;

    return (
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <Card
            link={`bodyComposition`}
            image={body}
            alt={"body"}
            title={"Latest body composition"}
            firstData={`Weight ${lastData.weight} kg`}
            secondData={`Fat ${lastData.fat} %`}
            thirdData={`Muscle ${lastData.muscle} kg`}
          />
          <Card
            link={`foodRecipes/${lastRecipe._id}`}
            image={pannukakku}
            alt={"recipe"}
            title={"Latest recipe"}
            firstData={`${lastRecipe.name}`}
            secondData={`${lastRecipe.duration} min`}
            thirdData={`${lastRecipe.portions} portions`}
            iconOne={<FaHourglassStart />}
            iconSecond={<FaUtensils />}
          />
        </div>
        <div className="row justify-content-center">
          <Card
            link={""}
            image={video}
            alt={"video"}
            title={"Latest youtube video"}
            firstData={`Weight ${lastData.weight} kg`}
            secondData={`Fat ${lastData.fat} %`}
            thirdData={`Muscle ${lastData.muscle} kg`}
            />
          <Card
            link={""}
            image={body}
            alt={"body"}
            title={"Latest body composition"}
            firstData={`Weight ${lastData.weight} kg`}
            secondData={`Fat ${lastData.fat} %`}
            thirdData={`Muscle ${lastData.muscle} kg`}
            />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  body: state.body.body
});

const mapDispatchToProps = dispatch => ({
  addRecipes: recipes => {dispatch({type: 'ADD_RECIPES', recipes})},
  addBody: (weight, fat, fatkg, muscle, date) => {dispatch({type: 'ADD_BODY', weight, fat, fatkg, muscle, date})}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
