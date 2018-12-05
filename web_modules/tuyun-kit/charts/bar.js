/**
 * @author sl204984
 * tuyun-bar
 * 条形图
 */
import React, { Component } from 'react';
import { Max } from 'tuyun-utils';
import BarPrompt from './bar-prompt';

export default class Bar extends Component {
  static defaultProps = {
    width: 300,
    height: 300,
    backgorundColor: '#fff',
    padding: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    title: {
      text: '示例',
      align: 'center', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
      fontSize: 20,
      fontWeight: 'blod', // blod, normal
      color: 'black',
      fontFamily: '微软雅黑'
    },
    // 提示
    tooltip: {},
    // 图例
    legend: '身高',
    // x 坐标轴
    xAxis: [
      { label: '迪迦', value: 'dijia' },
      { label: '擎天柱', value: 'qingtianzhu' },
      { label: '大黄蜂', value: 'dahuangfeng' },
      { label: '可达鸭', value: 'kedaya' },
      { label: '小智', value: 'xiaozhi' },
      { label: '小智障', value: 'xiaozhizhang' },
      { label: '绿巨人', value: 'lvjuren' }
    ],
    xLabel: {
      fontSize: 12,
      color: 'black',
      fontFamily: '微软雅黑'
    },
    // 对应的渐变色
    xAxisGradient: {
      dijia: ['#ff0', '#0ff'], // 0 表示 topColor， 1 表示 bottomColor
      qingtianzhu: [],
      xiaozhizhang: ['lightgreen', 'lightblue']
    },
    // y 坐标轴
    yAxis: {},
    // 组，为了支持多维数据
    data: {
      dijia: 30,
      qingtianzhu: 20,
      dahuangfeng: 15,
      kedaya: 1,
      xiaozhi: 1.8,
      xiaozhizhang: 1.6
    }
  };

  // 标题
  _titleH = 0;
  _titleW = 0;
  // 图表
  _chartH = 0;
  _chartW = 0;
  _chartBottom = 0;
  // x轴标注
  _xLabelH = 0;
  _xLabelW = 0;

  _ratio = 1; // canvas的实际渲染倍率

  componentWillMount() {
    const { data } = this.props;
    this._convertData(data);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this._convertData(data);
  }

  render() {
    const { width, height, padding, xAxis, data, title } = this.props;
    const _titleH = Math.ceil(title.fontSize / 0.62);
    const _data = xAxis.map(item => {
      return { label: item.label, value: item.value, count: data[item.value] };
    });
    return (
      <div style={{ position: 'relative', width, height }}>
        <canvas ref={_el => this._renderCanvas(_el)} />
        <BarPrompt
          padding={padding}
          width={width}
          height={height}
          chartTop={_titleH}
          data={_data}
        />
      </div>
    );
  }

  _convertData = data => {
    data.max = Max(data);
  };

  _renderCanvas = _canvas => {
    if (!_canvas) return;
    const { width, height, padding, title, xLabel } = this.props;

    this._canvas = _canvas;
    this._ctx = _canvas.getContext('2d');

    this._resolveBlurry(); // 解决高倍屏变模糊问题
    const { top = 0, right = 0, bottom = 0, left = 0 } = padding;
    this._titleH = Math.ceil(title.fontSize / 0.62); // 0.62 黄金分割
    this._xLabelW = this._titleW = this._chartW = width - right - left;
    this._xLabelH = Math.ceil(xLabel.fontSize / 0.62); // x标注高度
    // 图表框大小计算
    this._chartH = height - top - bottom - this._titleH - this._xLabelH; // 图表高度
    this._chartBottom = this._titleH + this._chartH; // 图表底部
    // 开始绘制
    this._renderBackground(); // 绘制背景
    this._renderTitle(); // 绘制标题
    this._renderChart(); // 绘制图表
  };

  _resolveBlurry = () => {
    const { width, height } = this.props;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio =
      this._ctx.webkitBackingStorePixelRatio ||
      this._ctx.mozBackingStorePixelRatio ||
      this._ctx.msBackingStorePixelRatio ||
      this._ctx.oBackingStorePixelRatio ||
      this._ctx.backingStorePixelRatio ||
      1;
    this._ratio = devicePixelRatio / backingStoreRatio; // 计算canvas的实际渲染倍率
    this._canvas.style = `width: ${width}px; height: ${height}px;`;
    this._canvas.width = width * this._ratio;
    this._canvas.height = height * this._ratio;
  };

  _renderBackground = () => {
    const { width, height, backgorundColor } = this.props;
    this._ctx.save();
    this._ctx.fillStyle = backgorundColor || 'white';
    this._ctx.fillRect(0, 0, width * this._ratio, height * this._ratio);
    this._ctx.restore();
  };

  _renderTitle = () => {
    const { title } = this.props;
    const {
      text,
      align = 'center',
      fontSize = 30,
      fontWeight,
      color = 'black',
      fontFamily = '微软雅黑'
    } = title;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart = 0;
    const _textMiddle = this._titleH / 2; // 文字居中位置
    if (align === 'left') {
    } else if (align === 'right') {
    } else {
      this._ctx.textAlign = 'center';
      _textStart = this._titleW / 2;
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

  _renderChart = () => {
    const { xAxis, xAxisGradient, data, padding } = this.props;
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
        (this._chartBottom - _yStart) * this._ratio,
        (_xEnd - _xStart) * this._ratio,
        (_yStart - _yEnd) * this._ratio
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
    const { width } = this.props;
    this._ctx.save();
    this._ctx.lineWidth = 1;
    this._ctx.strokeStyle = 'black';
    this._ctx.moveTo(
      ((width - this._chartW) / 2) * this._ratio,
      this._chartBottom * this._ratio
    );
    this._ctx.lineTo(
      ((width + this._chartW) / 2) * this._ratio,
      this._chartBottom * this._ratio
    );
    this._ctx.stroke();
    this._ctx.restore();
  };

  _renderXLabel = (textStart, text) => {
    const { xLabel } = this.props;
    const { color = 'black', fontSize = 12, fontFamily = '微软雅黑' } = xLabel;
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

const dutyRatio = 0.8; // 占空比，每个单元内图像宽度占整个宽度的面积
