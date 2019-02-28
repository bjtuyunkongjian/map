import React, { Component } from 'react';
import { ResolveBlurry } from 'tuyun-utils';
import {
  Padding,
  Title,
  Legend,
  PromptWidth,
  PromptGap
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
    data: [
      { value: 435, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ]
  };

  // canvas的实际渲染倍率
  _ratio = 1;
  // canvas 元素距离浏览器顶部和底部的距离
  _canvasEl; // canvas 元素
  _canvasTop = 0;
  _canvasLeft = 0;
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
      height: canvasHeight,
      top: canvasTop,
      left: canvasLeft
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._canvasW = canvasWidth; // 赋值
    this._canvasH = canvasHeight; // 赋值
    this._canvasTop = canvasTop; // 赋值
    this._canvasLeft = canvasLeft; // 赋值
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

  _renderChart = () => {
    const { data } = this.props;
    const _center = {
      x: (this._chartW * this._ratio) / 2,
      y: (this._chartBottom - this._chartH / 2) * this._ratio
    };
    const _radius =
      (Math.min(this._chartH, this._chartW) / 2) * 0.9 * this._ratio; // 长宽较小值的一半的百分之九十
    let _addedPercentage = 0;
    const _interval = 120 / data.length;
    this._sectorArr = data.map((item, index) => {
      const _sector = {}; // 扇形
      _sector.x = _center.x; // 圆心 x 坐标
      _sector.y = _center.y; // 圆心 y 坐标
      _sector.originRadius = _sector.radius = _radius; // 原始半径 和 显示半径
      _sector.hue = index % 2 ? 180 + _interval * index : _interval * index;
      // index % 2 ? 180 + (20 * index) / 2 : 20 * (index - 1); // 色调
      _sector.saturation = 80; // 饱和度
      _sector.lightness = 60; // 亮度
      _sector.color = `hsla(${_sector.hue}, ${_sector.saturation}%, ${
        _sector.lightness
      }%, 1)`; // 颜色
      _sector.value = item.value; // 值
      _sector.name = item.name; // 名称
      _sector.percentage = item.value / this._totalData; // 占的百分比
      _sector.startAngle = _addedPercentage * Math.PI * 2; // 起始角
      _sector.endAngle = (_addedPercentage + _sector.percentage) * Math.PI * 2; // 终止角
      _sector.path2D = this._createSectorPath(_sector);
      _addedPercentage += _sector.percentage; // 计算下一个百分比的起始值
      return _sector;
    });
    this._drawSector();
  };

  _createSectorPath = sector => {
    const path2D = new Path2D(); // 路径
    path2D.arc(
      sector.x,
      sector.y,
      sector.radius,
      sector.startAngle,
      sector.endAngle
    ); // 该扇形区间的面积
    path2D.lineTo(sector.x, sector.y);
    return path2D;
  };

  _drawSector = () => {
    this._ctx.clearRect(
      0,
      (this._chartBottom - this._chartH) * this._ratio,
      this._chartW * this._ratio,
      this._chartH * this._ratio
    );
    for (let item of this._sectorArr) {
      this._ctx.save();
      this._ctx.fillStyle = item.color;
      this._ctx.fill(item.path2D);
      this._ctx.restore();
    }
  };

  _onMouseMove = event => {
    const _x = event.clientX - this._canvasLeft;
    const _y = event.clientY - this._canvasTop;
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
        if (!sector.expanded) {
          // 鼠标在该扇形区域内，并且该扇形区域扩展了，不做任何操作
          sector.radius = sector.originRadius * 1.05; // 半径是原来的 1.05 倍
          sector.path2D = this._createSectorPath(sector);
          sector.color = `hsla(${sector.hue}, ${sector.saturation *
            1.2}%, ${sector.lightness * 1.1}%, 1)`; // 颜色变亮
          sector.expanded = true; // 扩展
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
      } else if (sector.expanded && !sector.selected) {
        // 不在该扇形区间内，该扇形区间已做扩展并且未被选中
        sector.radius = sector.originRadius; // 半径恢复为原来的半径
        sector.path2D = this._createSectorPath(sector);
        sector.color = `hsla(${sector.hue}, ${sector.saturation}%, ${
          sector.lightness
        }%, 1)`; // 颜色恢复
        sector.expanded = false; // 没有扩展
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
}
