import React, { Component } from 'react';
import { TuyunModal } from 'tuyun-kit';

export default class ColorModal extends Component {
  static defaultProps = {
    visible: false,
    onSelect: () => {}
  };

  render() {
    const { visible } = this.props;
    return (
      <TuyunModal visible={visible}>
        <canvas
          ref={_el => this._renderImageCanvas(_el)}
          width={canvasW}
          height={canvasW}
          onClick={e => this._selectColor(e)}
        />
      </TuyunModal>
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
