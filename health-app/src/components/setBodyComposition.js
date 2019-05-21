import React from 'react';
import { Component } from 'react';

import { InputGroup, FormControl, ButtonToolbar, Button, } from 'react-bootstrap';
import { FaWeight, FaCalendarDay } from 'react-icons/fa';

import '../styles/styles.css';

import { setBodyComposition, getBodyComposition } from '../api';

import SavedModal from './savedModal';

class SetBodyComposition extends Component {

  state = {
    weight: '',
    fat: '',
    muscle: '',
    date: '',
    error: false,
    show: false,
    smShow: false
  }

  handleSubmit = async (e) => {
		if (
			this.state.weight === '' ||
			this.state.fat === '' ||
			this.state.muscle === '' ||
			this.state.date === '') {
			this.setState({ error: true });
		} else {
      const weight = parseFloat(this.state.weight).toFixed(2);
      const fat = parseFloat(this.state.fat).toFixed(2);
			const fatkg = parseFloat(this.state.weight * this.state.fat / 100).toFixed(2);
      const muscle = parseFloat(this.state.weight * this.state.muscle / 100).toFixed(2);

			const newItem = {
        weight: weight,
				fat: fat,
				fatkg: fatkg,
				muscle: muscle,
        date: this.state.date,
      }

      setBodyComposition(newItem);
      const data = await setBodyComposition();
      if(data.data.n === 1 && data.data.ok === 1){
        this.setState({
          show: true,
          weight: '',
          fat: '',
          muscle: '',
          date: ''
        });
        this.timer();
        this.props.update();
      }
    }
  }

  timer = () => {
    setTimeout(() => {
      this.setState({show: false});
    }, 1000);
  }

  render() {
    return (
      <div className="col-sm-4 setBodyComposition">
        <SavedModal show={this.state.show} saved={'Body composition added'}/>
        <InputGroup size="default" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default"><FaWeight /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(e) => this.setState({weight: e.target.value})}
            value={this.state.weight}
            type="number"
            placeholder="Set weight"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="default" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default"><FaWeight /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(e) => this.setState({fat: e.target.value})}
            value={this.state.fat}
            type="number"
            placeholder="Set fat %"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="default" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default"><FaWeight /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(e) => this.setState({muscle: e.target.value})}
            value={this.state.muscle}
            type="number"
            placeholder="Set muscle %"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="default" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default"><FaCalendarDay /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(e) => this.setState({date: e.target.value})}
            value={this.state.date}
            type="date"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        { this.state.error ? <p className="smallError">Check all fields</p> : null }
        <ButtonToolbar>
          <Button
            onClick={this.handleSubmit}
            variant="secondary"
            size="mg"
            active
          >
            Save
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default SetBodyComposition;
