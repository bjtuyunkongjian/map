import React, { Component } from 'react';
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md';

export default class TuyunModal extends Component {
  static defaultProps = {
    title: '标题',
    visible: false,
    onSelect: () => {},
    onOpen: () => {},
    onClose: () => {}
  };

  render() {
    const { visible, onOpen, onClose, children, title } = this.props;
    return (
      <Modal
        isOpen={visible}
        onAfterOpen={() => onOpen()}
        onRequestClose={() => onClose()}
        style={customStyles}
      >
        <div className="ReactModal__Content--header">
          <div className="header-text">{title}</div>
          <MdClear className="close-modal" />
        </div>
        <div className="ReactModal__Content--body">{children}</div>
        <div className="ReactModal__Content--footer">
          <div className="btn-cancel">取消</div>
          <div className="btn-submit">确定</div>
        </div>
      </Modal>
    );
  }
}

const customStyles = {
  content: {
    width: '520px',
    top: '100px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0)',
    padding: '0',
    boxSizing: 'border-box'
  }
};

Modal.setAppElement('#root');
