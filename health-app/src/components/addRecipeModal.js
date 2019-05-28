import React from 'react';
import { Component } from 'react';

import { Button,Modal } from 'react-bootstrap';

import AddRecipe from './addRecipe';

class AddRecipeModal extends Component {

  update = () => {
    this.props.update();
  }

  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddRecipe update={() => this.update()} onHide={this.props.onHide}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddRecipeModal;