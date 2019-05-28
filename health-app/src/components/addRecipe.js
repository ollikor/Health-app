import React from 'react';
import { Component } from 'react';

import { InputGroup, FormControl, ButtonToolbar, Button, } from 'react-bootstrap';

import { FaBreadSlice, FaCalendarDay, FaTimes, FaHourglassStart, FaUtensils, FaGripfire } from 'react-icons/fa';

import '../styles/styles.css';

import { addRecipe } from '../api';

import SavedModal from './savedModal';


class AddRecipe extends Component {


  state = {
    name: '',
    duration: '',
    portions: '',
    temperature: '',
    ingredient: '',
    ingredients: [],
    description: '',
    date: '',
    error: false,
    file: '',
    imagePreviewUrl: '',
    show: false
  }

  handleSubmit = async () => {
		if (
			this.state.name === '' ||
			this.state.duration === '' ||
			this.state.portions === '' ||
			this.state.temperature === '' ||
			this.state.date === '' ||
			this.state.ingredients.length < 0 ||
      this.state.description === '') {
      console.log('this.state.file');
      console.log(this.state.file);
			this.setState({ error: true });
		} else {
      // const file = this.state.file;
      // const image = this.getBase64(file);

			const newItem = {
        name: this.state.name,
        duration: this.state.duration,
        portions: this.state.portions,
        temperature: this.state.temperature,
				date: this.state.date,
				ingredients: this.state.ingredients,
        description: this.state.description,
      }
      const data = await addRecipe(newItem);
      if(data.data.n === 1 && data.data.ok === 1){
        this.props.onHide();
        this.props.update();
      }
    }
  }

  AddIngredient = (e) => {
    const ingredient = this.state.ingredient;
    let ingredients = this.state.ingredients;
    ingredients.push(ingredient);
    this.setState({ ingredients: ingredients, ingredient: '' });
  }

  deleteIngredient = (index) => {
    let ingredients = this.state.ingredients;
    ingredients.splice(index, 1);
    this.setState({ ingredients: ingredients });
  }

  handleImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file);
    console.log(file);
    this.getBase64(file);
  }

  getBase64(file){
    console.log('fdsfa');
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result;
      console.log('base64');
      console.log(base64);
    }
  }

  render() {
    return (
      <div className="row justify-content-center addRecipeContainer">
        <div className="col-sm-6 setBodyinformation">
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaBreadSlice /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e) => this.setState({name: e.target.value})} type="text" placeholder="Set name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaHourglassStart /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e) => this.setState({duration: e.target.value})} type="number" min="1" placeholder="Set duration (min)" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaUtensils /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e) => this.setState({portions: e.target.value})} type="number" min="1" placeholder="Set portions" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaGripfire /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e) => this.setState({temperature: e.target.value})} type="number" min="1" placeholder="Set oven temperature" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaCalendarDay /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e) => this.setState({date: e.target.value})} type="date" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              value={this.state.ingredient}
              onChange={(e) => this.setState({ingredient: e.target.value})}
              placeholder="Add ingredient"
              aria-label="Add ingredient"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={this.AddIngredient} variant="outline-secondary">Add</Button>
            </InputGroup.Append>
          </InputGroup>
          {this.state.ingredients.map((item, index) => (
            <div key={index}>
              <ul>
                <li>
                  <span className="ingredient">{item}</span>
                  <FaTimes className="deleteIngredient" onClick={() => this.deleteIngredient(index)} />
                </li>
              </ul>
            </div>
          ))}
          {/* <InputGroup size="default" className="mb-3">
            <FormControl className="getPicture" onChange={this.handleImage} type="file" placeholder="Set picture" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup> */}
          <InputGroup>
          {this.state.imagePreviewUrl !== '' ?<img className="loadedImage" src={this.state.imagePreviewUrl} alt="dsaf" />:null}
          <InputGroup.Prepend>
            <InputGroup.Text>Description</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl onChange={(e) => this.setState({description: e.target.value})} className="description" as="textarea" aria-label="With textarea" />
          </InputGroup>
          { this.state.error ? <p className="smallError">Check all fields</p> : null }
          <ButtonToolbar>
            <Button className="saveRecipe" onClick={this.handleSubmit} variant="secondary" size="mg" active>
              Save
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
