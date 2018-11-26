import React, { Component } from 'react';
import Modal from 'react-modal';

export default class ColorModal extends Component {
  static defaultProps = {
    visible: false,
    onSelect: () => {}
  };

  render() {
    const { visible } = this.props;
    return (
      <Modal
        isOpen={visible}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => {
          console.log('aaaaa');
        }}
        style={customStyles}
      >
        <canvas
          ref={_el => this._renderImageCanvas(_el)}
          width={canvasW}
          height={canvasW}
          onClick={e => this._selectColor(e)}
        />
      </Modal>
    );
  }

  _renderImageCanvas = _canvas => {
    if (!_canvas) return;
    this._canvas = _canvas;
    this._ctx = _canvas.getContext('2d');
    for (var i = 0; i < denominator; i++) {
      for (var j = 0; j < denominator; j++) {
        this._ctx.fillStyle = this._createColor(i, j);
        this._ctx.fillRect(i * cellW, j * cellW, cellW, cellW);
      }
    }
  };

  _createColor = (i, j) => {
    const _red = Math.floor(255 - (255 / denominator) * i);
    const _green = Math.floor(255 - (255 / denominator) * j);
    const _blue = Math.floor((255 / denominator ** 2) * i * j);
    return `rgb(${_red}, ${_green}, ${_blue})`;
  };

  _selectColor = event => {
    const { onSelect } = this.props;
    const _rect = this._canvas.getBoundingClientRect();
    const _x = event.clientX - _rect.left * (canvasW / _rect.width);
    const _y = event.clientY - _rect.top * (canvasW / _rect.height);
    const _i = Math.floor(_x / cellW);
    const _j = Math.floor(_y / cellW);
    const rgb = this._createColor(_i, _j);
    onSelect(rgb);
  };
}

const canvasW = 300; // canvas 的边长
const denominator = 100; // canvas 的一条边分成几份
const cellW = canvasW / denominator; // 每个颜色的值

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 20
  }
};

Modal.setAppElement('#root');
