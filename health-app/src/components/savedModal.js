import React from 'react';
import { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

class SavedModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
      >
          <Modal.Body className="savedBody">{this.props.saved}<FaCheckCircle className="savedIcon" /></Modal.Body>
      </Modal>
    );
  }
}

export default SavedModal;