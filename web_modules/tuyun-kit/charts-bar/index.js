/**
 * @author sl204984
 * tuyun-bar
 * 条形图
 */
import React, { Component } from 'react';
import { Max, ResolveBlurry } from 'tuyun-utils';
import BarPrompt from './bar-prompt';
import { Padding, Title, Legend, XLabel } from './style-options';

export default class Bar extends Component {
  static defaultProps = {
    width: 300,
    height: 300,
    backgorundColor: '#fff',
    padding: Padding,
    title: Title,
    // 提示
    tooltip: {},
    // 图例，说明
    legend: Legend,
    // x 坐标轴
    xAxis: [],
    xLabel: XLabel,
    // 对应的渐变色
    xAxisGradient: {},
    // 数据
    data: {},
    dutyRatio: 0.6 // 占空比，每个单元内图像宽度占整个宽度的面积
  };

  // 标题
  _titleH = 0;
  _titleW = 0;
  // 图例说明
  _legendH = 0;
  _legendW = 0;
  // 图表
  _chartH = 0;
  _chartW = 0;
  _chartBottom = 0;
  // x轴标注
  _xLabelH = 0;
  _xLabelW = 0;
  // canvas的实际渲染倍率
  _ratio = 1;
  // 图标的 wrap
  _canvasW = 0;
  _canvasH = 0;

  componentWillMount() {
    this._convertProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._convertProps(nextProps);
  }

  render() {
    const { width, height, padding, xAxis, data } = this.props;
    const _data = xAxis.map(item => {
      return { label: item.label, value: item.value, count: data[item.value] };
    });
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
          overflow: 'hidden',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
      >
        <canvas
          ref={_el => this._renderCanvas(_el)}
          style={{ width: '100%', height: '100%' }}
          height={height}
        />
        <BarPrompt
          padding={padding}
          width={width}
          height={height}
          chartTop={this._titleH + this._legendH}
          data={_data}
        />
      </div>
    );
  }

  _convertProps = props => {
    const { data, padding, title, legend, xLabel } = props;
    data.max = Math.ceil(Max(data) * 1.05);
    // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(legend, Object.assign({}, Legend, legend));
    Object.assign(xLabel, Object.assign({}, XLabel, xLabel));
    // 设置初始值
    this._titleH = Math.ceil(title.fontSize / 0.62); // 0.62 黄金分割
    this._legendH = Math.ceil(legend.fontSize / 0.62); // 注释的高度
    this._xLabelH = Math.ceil(xLabel.fontSize / 0.62); // x标注高度
  };

  _renderCanvas = _canvas => {
    if (!_canvas) return;
    const { padding } = this.props;
    const { width: canvasW, height: canvasH } = _canvas.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._canvasW = canvasW; // 赋值
    this._canvasH = canvasH; // 赋值
    this._ctx = _canvas.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(_canvas, this._ctx, {
      width: canvasW,
      height: canvasH
    }); // 解决高倍屏变模糊问题
    const {
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft
    } = padding;
    this._chartW = this._xLabelW = this._titleW = this._legendW =
      canvasW - paddingRight - paddingLeft; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    // 图表框大小计算
    this._chartH =
      canvasH -
      paddingTop -
      paddingBottom -
      this._titleH -
      this._legendH -
      this._xLabelH; // 图表高度
    this._chartBottom = canvasH - paddingTop - paddingBottom - this._xLabelH; // 图表底部
    // 开始绘制
    this._renderBackground(); // 绘制背景
    this._renderTitle(); // 绘制标题
    this._renderLegend(); // 绘制图例
    this._renderChart(); // 绘制图表
  };

  // 绘制背景颜色
  _renderBackground = () => {
    const { backgorundColor } = this.props;
    this._ctx.save();
    this._ctx.fillStyle = backgorundColor || 'white';
    this._ctx.fillRect(
      0,
      0,
      this._canvasW * this._ratio,
      this._canvasH * this._ratio
    );
    this._ctx.restore();
  };

  // 计算标题位置
  // 上下居中，文字基线对齐选项是 middle，起始位置是 paddingTop + this._titleH / 2
  // 左对齐、右对齐、左右居中都要把 padding 给计算进去
  _renderTitle = () => {
    const { title, padding } = this.props;
    const { text, align, fontSize, fontWeight, color, fontFamily } = title;
    const { top: paddingTop, right: paddingRight, left: paddingLeft } = padding;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._titleH / 2 + paddingTop; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = paddingLeft;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._titleW + paddingLeft;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = (this._titleW + paddingLeft + paddingRight) / 2;
    }
    this._ctx.textBaseline = 'middle';
    if (fontWeight === 'blod') {
      this._ctx.fillText(
        text,
        _textStart * this._ratio,
        (_textMiddle - 0.5) * this._ratio
      );
      this._ctx.fillText(
        text,
        (_textStart - 0.5) * this._ratio,
        _textMiddle * this._ratio
      );
      this._ctx.fillText(
        text,
        _textStart * this._ratio,
        (_textMiddle + 0.5) * this._ratio
      );
      this._ctx.fillText(
        text,
        (_textStart + 0.5) * this._ratio,
        _textMiddle * this._ratio
      );
    } else {
      this._ctx.fillText(
        text,
        _textStart * this._ratio,
        _textMiddle * this._ratio
      );
    }
    this._ctx.restore();
  };

  // 绘制注释文字
  _renderLegend = () => {
    const { legend, padding } = this.props;
    const { text, align, fontSize, color, fontFamily } = legend;
    const { top: paddingTop, right: paddingRight, left: paddingLeft } = padding;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._titleH + paddingTop + this._legendH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = paddingLeft;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._titleW + paddingLeft;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = (this._titleW + paddingLeft + paddingRight) / 2;
    }
    this._ctx.fillText(
      text,
      _textStart * this._ratio,
      _textMiddle * this._ratio
    );
    this._ctx.restore();
  };

  _renderChart = () => {
    const { xAxis, xAxisGradient, data, padding, dutyRatio } = this.props;
    const _xAxisCellW = this._chartW / xAxis.length; // x轴坐标每一个小单元的宽度
    const _barCellW = _xAxisCellW * dutyRatio; // 每条柱状图的宽度
    for (let index = 0; index < xAxis.length; index++) {
      const _val = xAxis[index].value;
      const _gradient = xAxisGradient[_val] || [];
      const _y = data[_val];
      const _max = data.max;
      // 绘制属性
      const _xStart =
        index * _xAxisCellW + (_xAxisCellW - _barCellW) / 2 + padding.left;
      const _xEnd =
        index * _xAxisCellW + (_xAxisCellW + _barCellW) / 2 + padding.left;
      const _yStart = (_y / _max) * this._chartH;
      const _yEnd = 0;
      const _topColor = _gradient[0] || '#f00';
      const _bottomColor = _gradient[1] || '#00f';
      const _drawRact = [
        _xStart * this._ratio,
        (this._chartBottom - _yStart) * this._ratio || 0,
        (_xEnd - _xStart) * this._ratio,
        (_yStart - _yEnd) * this._ratio || 0
      ];
      // 填充位置
      const _fillRect = [
        _drawRact[0],
        _drawRact[1],
        _drawRact[2] + _drawRact[0],
        _drawRact[3] + _drawRact[1]
      ];
      const _grad = this._ctx.createLinearGradient(..._fillRect); // 创建一个渐变色线性对象
      _grad.addColorStop(0, _topColor); // 定义渐变色开始的颜色
      _grad.addColorStop(1, _bottomColor); // 定义渐变色结束的颜色
      this._ctx.save();
      this._ctx.fillStyle = _grad; // 设置fillStyle为当前的渐变对象
      this._ctx.fillRect(..._drawRact); //绘制渐变图形
      this._ctx.restore();
      this._renderXLabel((_xStart + _xEnd) / 2, xAxis[index].label); // 绘制x标注，参数: x坐标轴标注位置, x坐标轴标注值
    }
    this._renderXAxis(); // 绘制x轴
  };

  _renderXAxis = () => {
    this._ctx.save();
    this._ctx.lineWidth = 1;
    this._ctx.strokeStyle = 'black';
    this._ctx.moveTo(
      ((this._canvasW - this._chartW) / 2) * this._ratio,
      this._chartBottom * this._ratio
    );
    this._ctx.lineTo(
      ((this._canvasW + this._chartW) / 2) * this._ratio,
      this._chartBottom * this._ratio
    );
    this._ctx.stroke();
    this._ctx.restore();
  };

  _renderXLabel = (textStart, text) => {
    const { xLabel } = this.props;
    const { color, fontSize, fontFamily } = xLabel;
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    const _textMiddle = this._chartBottom + this._xLabelH / 2; // 文字居中位置
    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'middle';
    this._ctx.fillText(
      text,
      textStart * this._ratio,
      _textMiddle * this._ratio
    );
  };
}
