import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Button,Modal } from 'react-bootstrap';

import { removeChannel } from '../api';

class deleteModal extends Component {

  handleDelete = () => {
    const urlName = this.props.url;
    const id = this.props.id;

    removeChannel(urlName, id);
    this.props.onHide();
    // this.props.removed();
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

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
});

const mapDispatchToProps = dispatch => ({
  // aaa: (id) => {dispatch({type: 'UPDATE', id})},
});

export default connect(mapStateToProps, mapDispatchToProps)(deleteModal);