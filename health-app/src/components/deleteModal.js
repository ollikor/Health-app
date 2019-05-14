import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { Button,Modal } from 'react-bootstrap';

class AddRecipeModal extends Component {
  handleDelete = () => {
    const url = `http://localhost:8000/${this.props.url}${this.props.id}`;
    console.log(url);
    axios.delete(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.onHide();
  }
  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Cancel
          </Button>
          <NavLink className="navLinkCard" to={`${this.props.move}`}>
            <Button variant="primary" onClick={this.handleDelete}>
              Remove
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddRecipeModal;