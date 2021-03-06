import React, { Component } from 'react';
import { TuyunModal } from 'tuyun-kit';

export default class ColorModal extends Component {
  static defaultProps = {
    visible: false,
    onOk: () => {},
    onCancel: () => {}
  };

  state = {
    rgb: ''
  };

  render() {
    const { rgb } = this.state;
    const { visible, onOk, onCancel } = this.props;
    return (
      <TuyunModal
        title="配色板"
        visible={visible}
        onOk={() => (rgb ? onOk(rgb) : onCancel())}
        onCancel={() => onCancel()}
      >
        <div className="color-picker">
          <canvas
            className="palette"
            ref={_el => this._renderImageCanvas(_el)}
            width={canvasW}
            height={canvasW}
            onClick={e => this._selectColor(e)}
          />
          <div className="right-options">
            <div className="selected-color-box">
              <span>所选颜色：</span>
              {rgb ? (
                <div
                  className="selected-color"
                  style={{ backgroundColor: rgb }}
                />
              ) : (
                '无'
              )}
            </div>
          </div>
        </div>
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
    const _rect = this._canvas.getBoundingClientRect();
    const _x = event.clientX - _rect.left * (canvasW / _rect.width);
    const _y = event.clientY - _rect.top * (canvasW / _rect.height);
    const _i = Math.floor(_x / cellW);
    const _j = Math.floor(_y / cellW);
    const rgb = this._createColor(_i, _j);
    this.setState({ rgb });
  };
}

const canvasW = 300; // canvas 的边长
const denominator = 100; // canvas 的一条边分成几份
const cellW = canvasW / denominator; // 每个颜色的值
