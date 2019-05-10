import React from 'react';
import { Component } from 'react';
import { InputGroup, FormControl, ButtonToolbar, Button, } from 'react-bootstrap';
import { FaWeight, FaCalendarDay, FaTimes, FaHourglassStart, FaUtensils, FaGripfire } from 'react-icons/fa';

import '../styles/styles.css';

class AddRecipe extends Component {


  state = {
    name: '',
    ingredient: '',
    ingredients: [],
    description: '',
    date: '',
    error: false,
    image: ''
  }

  handleSubmit = (e) => {
		if (
			this.state.name === '' ||
			this.state.date === '' ||
			this.state.ingredients.length < 0 ||
			this.state.description === '') {
			this.setState({ error: true });
		} else {

			const newItem = {
				name: this.state.name,
				date: this.state.date,
				ingredients: this.state.ingredients,
				description: this.state.description,
      }
      console.log(newItem);
			// const url = 'http://localhost:8000';
			// axios.post(url, newItem)
			// 	.then((response) => {
			// 		window.location.reload();
      //     //console.log(response);
      //     alert('Tiedot tallennettu onnistuneesti');
			// 	})
			// 	.catch((error) => {
      //     //console.log(error);
      //     alert('Tietojen tallennus epäonnistui');
			// 	});
  }
}

  handleName = (e) => {
    this.setState({ name: e.target.value });
  }

  handleIngredients = (e) => {
    this.setState({ ingredient: e.target.value });
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

  handleDate = (e) => {
    this.setState({ date: e.target.value });
  }

  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  handleImage = (e) => {
    console.log(e.target.files);
    //this.setState({ image: e.target.files });
  }

  render() {
    return (
      <div className="row justify-content-center addRecipeContainer">
        <div className="col-sm-6 setBodyinformation">
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaWeight /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleName} type="text" placeholder="Set name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaHourglassStart /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleName} type="number" min="1" placeholder="Set duration (min)" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaUtensils /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleName} type="number" min="1" placeholder="Set portions" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaGripfire /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleName} type="number" min="1" placeholder="Set oven temperature" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="default" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><FaCalendarDay /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleDate} type="date" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              value={this.state.ingredient}
              onChange={this.handleIngredients}
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
          <InputGroup size="default" className="mb-3">
            <FormControl className="getPicture" onChange={this.handleImage} type="file" placeholder="Set picture" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleDescription} className="description" as="textarea" aria-label="With textarea" />
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
