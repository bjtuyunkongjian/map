import React, { Component } from 'react';
import Modal from 'react-modal';

export default class TuyunModal extends Component {
  static defaultProps = {
    visible: false,
    onSelect: () => {},
    onOpen: () => {},
    onClose: () => {}
  };

  render() {
    const { visible, onOpen, onClose, children } = this.props;
    return (
      <Modal
        isOpen={visible}
        onAfterOpen={() => onOpen()}
        onRequestClose={() => onClose()}
        style={customStyles}
      >
        {children}
      </Modal>
    );
  }
}

const customStyles = {
  content: {
    top: '100px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0)',
    paddingBottom: 24
  }
};

Modal.setAppElement('#root');
