import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Button,Modal } from 'react-bootstrap';

import { remove } from '../api';

class deleteModal extends Component {

  handleDelete = async () => {
    const urlName = this.props.url;
    const id = this.props.id;

    const data = await remove(urlName, id);
    if(data.n === 1 && data.ok === 1) {
      this.props.onHide();
      this.props.update();
    }
  }

  render() {
    const {title, description, move, onHide} = this.props;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <NavLink className="navLinkCard" to={`${move}`}>
            <Button variant="primary" onClick={this.handleDelete}>
              Remove
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default deleteModal;