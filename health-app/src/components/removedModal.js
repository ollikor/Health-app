import React from 'react';
import { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

class RemovedModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
      >
          <Modal.Body className="savedBody">dsaf<FaCheckCircle className="savedIcon" /></Modal.Body>
      </Modal>
    );
  }
}

export default RemovedModal;