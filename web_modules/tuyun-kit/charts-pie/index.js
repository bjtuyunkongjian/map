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
    width: 300,
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
    this._titleH = Math.ceil(title.fontSize / 0.62); // 0.62 黄金分割
    this._legendH = Math.ceil(legend.fontSize / 0.62); // 注释的高度
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
    this._canvasW = canvasWidth; // 赋值
    this._canvasH = canvasHeight; // 赋值
    this._ctx = this._canvasEl.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(this._canvasEl, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    this._chartW = this._xLabelW = this._titleW = this._legendW = canvasWidth; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    this._chartH = canvasHeight - this._titleH - this._legendH; // 图表高度
    this._chartBottom = canvasHeight; // 图表底部
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
    this._ctx.fillText(
      text,
      _textStart * this._ratio,
      _textMiddle * this._ratio
    );
    this._ctx.restore();
  };

  // 绘制饼图
  _renderChart = () => {
    const { data, selectedIndex } = this.props;
    const _center = {
      x: (this._chartW * this._ratio) / 2,
      y: (this._chartBottom - this._chartH / 2) * this._ratio
    };
    const _radius =
      (Math.min(this._chartH, this._chartW) / 2) * 0.8 * this._ratio; // 长宽较小值的一半的百分之八十
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
      _sector.name = item.name; // 名称
      _sector.percentage = item.value / this._totalData; // 占的百分比
      _sector.startAngle = _addedPercentage * Math.PI * 2; // 起始角
      _sector.endAngle = (_addedPercentage + _sector.percentage) * Math.PI * 2; // 终止角
      _sector.path2D = this._createSectorPath(_sector); // 扇形区域
      // todo 绘制指向的线
      _addedPercentage += _sector.percentage; // 计算下一个百分比的起始值
      return _sector;
    });
    this._drawSector();
  };

  _onMouseMove = event => {
    const {
      top: canvasTop,
      left: canvasLeft
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
      if (this._ctx.isPointInPath(sector.path2D, _ratioX, _ratioY)) {
        if (!sector.hovered) {
          // 鼠标在该扇形区域内，并且该扇形区域扩展了，不做任何操作
          sector.hovered = true; // 扩展
          sector.path2D = this._createSectorPath(sector);
          _shouldRedraw = true; // 需要重绘
        }
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        const { padding } = this.props;
        _showPrompt = true; // 显示提示框
        _curSector = sector; // 当前鼠标所在扇形区间
        _isLeft = _x < this._canvasW + padding.right - PromptWidth - PromptGap;
        _promptLeft = _x + padding.left + PromptGap;
        _promptRight = this._canvasW + padding.right - _x + PromptGap;
        _isTop = _y < this._chartBottom - this._chartH / 2;
        _promptTop = _y + padding.top;
        _promptBottom = this._canvasH + padding.bottom - _y; // (padding.top + this._chartH + padding.bottom) - (_y + padding.top)
      } else if (sector.hovered && !sector.selected) {
        // 不在该扇形区间内，该扇形区间已做扩展并且未被选中
        sector.radius = sector.originRadius; // 半径恢复为原来的半径
        sector.hovered = false; // 没有扩展
        sector.path2D = this._createSectorPath(sector);
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
    let _shouldRedraw = true; // 需要重绘
    for (let sector of this._sectorArr) {
      if (sector.selected) {
        sector.hovered = true; // 扩展
        sector.path2D = this._createSectorPath(sector);
        _shouldRedraw = true; // 需要重绘
      } else {
        sector.radius = sector.originRadius; // 半径恢复为原来的半径
        sector.hovered = false; // 没有扩展
        sector.path2D = this._createSectorPath(sector);
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
      if (this._ctx.isPointInPath(sector.path2D, _ratioX, _ratioY)) {
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
      sector.path2D = this._createSectorPath(sector); // 扇形区域
    }
    this._drawSector(); // 重绘
  };

  _createSectorPath = sector => {
    const path2D = new Path2D(); // 路径
    const _isHighLight = sector.selected || sector.hovered; // 是否高亮
    const _radius = _isHighLight
      ? sector.originRadius * 1.05
      : sector.originRadius; // 半径
    path2D.arc(sector.x, sector.y, _radius, sector.startAngle, sector.endAngle); // 该扇形区间的面积
    path2D.lineTo(sector.x, sector.y); // 回到圆心
    return path2D;
  };

  _drawSector = () => {
    this._ctx.clearRect(
      0,
      (this._chartBottom - this._chartH) * this._ratio,
      this._chartW * this._ratio,
      this._chartH * this._ratio
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
      this._ctx.fillStyle = _color;
      this._ctx.fill(sector.path2D);
      this._ctx.restore();
    }
  };
}
