import React, { Component } from 'react';
import { ResolveBlurry } from 'tuyun-utils';
import {
  Padding,
  Title,
  Legend,
  PromptWidth,
  PromptGap,
  SectorColors
} from './style-options';
import Prompt from './prompt';

export default class ChartsPie extends Component {
  state = {
    showPrompt: false,
    curSector: {},
    isLeft: false,
    promptLeft: 0,
    promptRight: 0,
    isTop: false,
    promptTop: 0,
    promptBottom: 0
  };

  static defaultProps = {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    padding: Padding,
    title: Title,
    // 图例，说明
    legend: Legend,
    // 对应的渐变色
    xAxisGradient: {},
    // 数据
    data: [],
    // 选中的扇形
    selectedIndex: -1,
    onClick: () => {}
  };

  // canvas的实际渲染倍率
  _ratio = 1;
  // canvas 元素距离浏览器顶部和底部的距离
  _canvasEl; // canvas 元素
  _canvasW = 0;
  _canvasH = 0;
  // 总的数据
  _totalData = 1;
  // 图表属性
  _chartW = 0;
  _chartH = 0;
  _chartBottom = 0;

  componentWillMount() {
    this._convertProps(this.props);
  }

  componentDidMount() {
    this._renderCanvas(this._canvasEl);
  }

  componentWillReceiveProps(nextProps) {
    this._convertProps(nextProps);
    const { selectedIndex } = this.props;
    if (nextProps.selectedIndex !== selectedIndex) {
      this._renderSelected(nextProps.selectedIndex);
    }
  }

  render() {
    const {
      showPrompt,
      curSector,
      promptLeft,
      promptRight,
      isLeft,
      isTop,
      promptTop,
      promptBottom
    } = this.state;
    const { width, height, padding, backgroundColor } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
          overflow: 'hidden',
          backgroundColor,
          cursor: 'pointer',
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingTop: padding.top,
          paddingBottom: padding.bottom
        }}
      >
        <canvas
          ref={_el => (this._canvasEl = _el)}
          style={{ width: '100%', height: '100%' }}
          height={height}
          onMouseMove={this._onMouseMove}
          onMouseLeave={this._onMouseLeave}
          onClick={this._onClick}
        />
        <Prompt
          showPrompt={showPrompt}
          curData={curSector}
          isLeft={isLeft}
          promptLeft={promptLeft}
          promptRight={promptRight}
          isTop={isTop}
          promptTop={promptTop}
          promptBottom={promptBottom}
        />
      </div>
    );
  }

  _convertProps = props => {
    const { padding, title, legend, data } = props;
    // // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(legend, Object.assign({}, Legend, legend));
    // // 设置初始值
    this._titleH = title.text ? Math.ceil(title.fontSize / 0.62) : 0; // 0.62 黄金分割
    this._legendH = legend.text ? Math.ceil(legend.fontSize / 0.62) : 0; // 注释的高度
    let _total = 0;
    for (let item of data) {
      _total += item.value;
    }
    this._totalData = _total || 1;
  };

  _renderCanvas = () => {
    if (!this._canvasEl) return;
    const {
      width: canvasWidth,
      height: canvasHeight
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._ctx = this._canvasEl.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(this._canvasEl, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    // 重新计算 _titleH 和 _legendH
    this._titleH = this._titleH * this._ratio;
    this._legendH = this._legendH * this._ratio;
    this._canvasW = this._chartW = this._xLabelW = this._titleW = this._legendW =
      canvasWidth * this._ratio; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    this._chartH = canvasHeight * this._ratio - this._titleH - this._legendH; // 图表高度
    this._canvasH = this._chartBottom = canvasHeight * this._ratio; // 图表底部
    this._renderTitle(); // 绘制标题
    this._renderLegend(); // 绘制
    this._renderChart(); // 绘制图表
  };

  _renderTitle = () => {
    const { title } = this.props;
    const { text, align, fontSize, fontWeight, color, fontFamily } = title;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._titleH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = 0;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._titleW;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = this._titleW / 2;
    }
    this._ctx.textBaseline = 'middle';
    if (fontWeight === 'blod') {
      this._ctx.fillText(text, _textStart, _textMiddle - 0.5);
      this._ctx.fillText(text, _textStart - 0.5, _textMiddle);
      this._ctx.fillText(text, _textStart, _textMiddle + 0.5);
      this._ctx.fillText(text, _textStart + 0.5, _textMiddle);
    } else {
      this._ctx.fillText(text, _textStart, _textMiddle);
    }
    this._ctx.restore();
  };

  _renderLegend = () => {
    const { legend } = this.props;
    const { text, align, fontSize, color, fontFamily } = legend;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._titleH + this._legendH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = 0;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._titleW;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = this._titleW / 2;
    }
    this._ctx.fillText(text, _textStart, _textMiddle);
    this._ctx.restore();
  };

  // 绘制饼图
  _renderChart = () => {
    const { data, selectedIndex } = this.props;
    const _center = {
      x: this._chartW / 2,
      y: this._chartBottom - this._chartH / 2
    };
    const _radius = (Math.min(this._chartH, this._chartW) / 2) * 0.8; // 长宽较小值的一半的百分之八十
    let _addedPercentage = 0; // 已经计算的百分比
    const _scLength = SectorColors.length; // 扇区长度
    this._sectorArr = data.map((item, index) => {
      const _sector = {}; // 扇形
      _sector.x = _center.x; // 圆心 x 坐标
      _sector.y = _center.y; // 圆心 y 坐标
      _sector.originRadius = _radius; // 原始半径 和 显示半径
      _sector.selected = selectedIndex === index; // 是否被选中
      _sector.hue = SectorColors[index % _scLength][0]; // 色调
      _sector.saturation = SectorColors[index % _scLength][1]; // 饱和度
      _sector.lightness = SectorColors[index % _scLength][2]; // 亮度
      _sector.value = item.value; // 值
      _sector.label = item.label; // 名称
      _sector.percentage = item.value / this._totalData; // 占的百分比
      _sector.startAngle = _addedPercentage * Math.PI * 2; // 起始角
      _sector.endAngle = (_addedPercentage + _sector.percentage) * Math.PI * 2; // 终止角
      _sector.sectorPath = this._createSectorPath(_sector); // 扇形区域
      const { indicator, textAlign, textStart } = this._createIndicator(
        _sector
      ); // 指示
      _sector.indicator = indicator; // 指示线
      _sector.textAlign = textAlign; // 文字对齐方向
      _sector.textStart = textStart; // 文字起始位置
      // todo 绘制指向的线
      _addedPercentage += _sector.percentage; // 计算下一个百分比的起始值
      return _sector;
    });
    this._drawSector();
  };

  _onMouseMove = event => {
    const {
      top: canvasTop,
      left: canvasLeft,
      width: canvasWidth,
      height: canvasHeight
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    const _x = event.clientX - canvasLeft;
    const _y = event.clientY - canvasTop;
    const _ratioX = _x * this._ratio;
    const _ratioY = _y * this._ratio;
    let _shouldRedraw = false; // 需不需要重渲染
    // 提示框信息
    let _showPrompt = false; // 显示提示框
    let _curSector = {}; // 当前扇形
    let _isLeft = false; // 是否在左边
    let _promptLeft = 0; // 提示框距离左边的距离
    let _promptRight = 0; // 提示框距离右边的距离
    let _isTop = false; // 鼠标是否在图表的上半部分
    let _promptTop = 0;
    let _promptBottom = 0;
    for (let sector of this._sectorArr) {
      if (this._ctx.isPointInPath(sector.sectorPath, _ratioX, _ratioY)) {
        if (!sector.hovered) {
          // 鼠标在该扇形区域内，并且该扇形区域扩展了，不做任何操作
          sector.hovered = true; // 扩展
          sector.sectorPath = this._createSectorPath(sector);
          _shouldRedraw = true; // 需要重绘
        }
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        const { padding } = this.props;
        _showPrompt = true; // 显示提示框
        _curSector = sector; // 当前鼠标所在扇形区间
        _isLeft = _x < canvasWidth + padding.right - PromptWidth - PromptGap;
        _promptLeft = _x + padding.left + PromptGap;
        _promptRight = canvasWidth + padding.right - _x + PromptGap;
        _isTop = _y < canvasHeight - this._chartH / this._ratio / 2;
        _promptTop = _y + padding.top;
        _promptBottom = canvasHeight + padding.bottom - _y; // (padding.top + this._chartH + padding.bottom) - (_y + padding.top)
      } else if (sector.hovered && !sector.selected) {
        // 不在该扇形区间内，该扇形区间已做扩展并且未被选中
        sector.hovered = false; // 没有扩展
        sector.sectorPath = this._createSectorPath(sector);
        _shouldRedraw = true; // 需要重绘
      }
    }
    this.setState({
      showPrompt: _showPrompt,
      curSector: _curSector,
      isLeft: _isLeft,
      promptLeft: _promptLeft,
      promptRight: _promptRight,
      isTop: _isTop,
      promptTop: _promptTop,
      promptBottom: _promptBottom
    });
    _shouldRedraw && this._drawSector();
  };

  _onMouseLeave = () => {
    let _shouldRedraw = false; // 需要重绘
    for (let sector of this._sectorArr) {
      if (!sector.selected) {
        sector.hovered = false; // 没有扩展
        sector.sectorPath = this._createSectorPath(sector);
        _shouldRedraw = true; // 需要重绘
      }
    }
    this.setState({ showPrompt: false });
    _shouldRedraw && this._drawSector();
  };

  _onClick = () => {
    const { onClick } = this.props;
    const {
      top: canvasTop,
      left: canvasLeft
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    const _x = event.clientX - canvasLeft;
    const _y = event.clientY - canvasTop;
    const _ratioX = _x * this._ratio;
    const _ratioY = _y * this._ratio;
    for (let index = 0; index < this._sectorArr.length; index++) {
      const sector = this._sectorArr[index];
      if (this._ctx.isPointInPath(sector.sectorPath, _ratioX, _ratioY)) {
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        onClick({ curIndex: index, curSector: sector });
        break;
      }
    }
  };

  // 渲染选中区域
  _renderSelected = selectedIndex => {
    for (let index = 0; index < this._sectorArr.length; index++) {
      const sector = this._sectorArr[index];
      sector.hovered = false;
      sector.selected = selectedIndex === index;
      sector.sectorPath = this._createSectorPath(sector); // 扇形区域
    }
    this._drawSector(); // 重绘
  };

  _createSectorPath = sector => {
    const {
      x,
      y,
      originRadius,
      startAngle,
      endAngle,
      selected,
      hovered
    } = sector;
    const _path2D = new Path2D(); // 路径
    const _isHighLight = selected || hovered; // 是否高亮
    const _radius = _isHighLight ? originRadius * 1.08 : originRadius; // 半径
    _path2D.arc(x, y, _radius, startAngle, endAngle); // 该扇形区间的面积
    _path2D.lineTo(x, y); // 回到圆心
    return _path2D;
  };

  _createIndicator = sector => {
    const { x, y, originRadius, startAngle, endAngle } = sector;
    const _path2D = new Path2D(); // 新建路径
    const _midAngle = (startAngle + endAngle) / 2; // 中间角度
    // 径向指示线
    const _radialX = originRadius * 1.2 * Math.cos(_midAngle) + x; // 长度是半径的 1.1 倍
    const _radialY = originRadius * 1.2 * Math.sin(_midAngle) + y; // 长度是半径的 1.1 倍
    // 横向指示线
    const _horizontalLen = originRadius * 0.05; // 横向长度
    let _horizontalX; // 横向 x 轴
    let _textAlign; // 左对齐还是右对齐
    if (_midAngle > Math.PI / 2 && _midAngle < (Math.PI / 2) * 3) {
      _horizontalX = _radialX - _horizontalLen;
      _textAlign = 'right'; // 在左半圆，文字右对齐
    } else {
      _horizontalX = _radialX + _horizontalLen;
      _textAlign = 'left'; // 在右半圆，文字左对齐
    }
    _path2D.moveTo(x, y); // 起点坐标为圆心
    _path2D.lineTo(_radialX, _radialY); // 径向指示线的位置
    _path2D.lineTo(_horizontalX, _radialY); // 横向指示线
    return {
      indicator: _path2D,
      textAlign: _textAlign,
      textStart: [_horizontalX, _radialY]
    };
  };

  _drawSector = () => {
    this._ctx.clearRect(
      0,
      this._chartBottom - this._chartH,
      this._chartW,
      this._chartH
    ); // 清空绘图区
    for (let sector of this._sectorArr) {
      const _isHighLight = sector.selected || sector.hovered; // 是否高亮
      const _highlightColor = `hsla(${sector.hue}, ${sector.saturation *
        1.2}%, ${sector.lightness * 1.2}%, 1)`;
      const _originColor = `hsla(${sector.hue}, ${sector.saturation}%, ${
        sector.lightness
      }%, 1)`;
      const _color = _isHighLight ? _highlightColor : _originColor; // 设置颜色是否高亮
      this._ctx.save();
      // 绘制指示线
      this._ctx.strokeStyle = _originColor;
      this._ctx.stroke(sector.indicator);
      // 绘制扇形
      this._ctx.fillStyle = _color;
      this._ctx.fill(sector.sectorPath);
      // 绘制文字
      // this._ctx.fillStyle = _originColor;
      this._ctx.font = "16px '微软雅黑'";
      this._ctx.textAlign = sector.textAlign;
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(sector.label, ...sector.textStart);
      this._ctx.restore();
    }
  };
}
