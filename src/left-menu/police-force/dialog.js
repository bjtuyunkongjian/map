import React, { Component } from 'react';
import { MdClose } from 'react-icons/md';

export default class Dialog extends Component {
  static defaultProps = {
    visible: false,
    title: '警员信息',
    dialogInfo: [],
    onClose: () => {}
  };

  render() {
    const { visible, title, dialogInfo, onClose } = this.props;
    if (!visible) return null;
    return (
      <div className="police-force-dialog">
        <div className="title">
          {title} <MdClose className="title-icon" onClick={onClose} />
        </div>
        {dialogInfo.map((item, index) => (
          <div className="dialog-row" key={`dialog_row_${index}`}>
            {item}
          </div>
        ))}
      </div>
    );
  }
}
