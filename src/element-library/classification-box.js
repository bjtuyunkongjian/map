/**
 * @author sl204984
 * 添加动画，要计算 element-item 的高度
 */
import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import * as ClsBoxStyles from './classicication-box-style';

export default class ClassificationBox extends Component {
  state = {
    height: 0,
    visibleValue: ''
  };

  _interval = undefined;
  _columns = 4;
  _clsBox = undefined;

  render() {
    const { visibleValue } = this.state;
    const { Styles } = ClsBoxStyles;

    return (
      <div
        className="classification-box"
        style={Styles['classification-box']}
        ref={el => (this._clsBox = el)}
      >
        {elLibrary.map((classification, clsIndex) => {
          const _showChildEl = classification.value === visibleValue;
          return (
            <div key={`classification_${clsIndex}`}>
              <div
                className="classification-label"
                onClick={() => this._toggleShow(classification)}
              >
                {_showChildEl ? <IoIosArrowDown /> : <IoIosArrowForward />}
                <span className="label-name">{classification.label}</span>
              </div>
              {_showChildEl ? this._createChildEl(classification) : null}
            </div>
          );
        })}
      </div>
    );
  }

  _createChildEl = classification => {
    const { height = 0 } = this.state;
    const { Styles } = ClsBoxStyles;
    return (
      <ul
        className="classification"
        style={Object.assign({}, Styles.classification, { height })}
      >
        {classification.element.map((element, elIndex) => (
          <li
            className="element-item"
            key={`element_${elIndex}`}
            style={Styles['element-item']}
            draggable
          >
            <div
              className="element-img-box"
              style={Object.assign({}, Styles['element-img-box'], {
                backgroundImage: `url(${element.imgSrc})`
              })}
            />
            <div className="element-name" style={Styles['element-name']}>
              {element.name}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  _toggleShow = async classification => {
    const { visibleValue } = this.state;
    const { Columns } = ClsBoxStyles;
    const _toHide = visibleValue === classification.value;
    clearInterval(this._interval); // 清除定时器
    if (_toHide) {
      await this.setState({ visibleValue: '', height: 0 });
    } else {
      await this.setState({ visibleValue: classification.value, height: 0 });
      const _rows = Math.ceil(classification.element.length / Columns);
      const _rowH = Math.ceil(this._caculateRowHeight());
      this._animate(_rows * _rowH, 300);
    }
  };

  _caculateRowHeight = () => {
    const { width: clsBoxW } = this._clsBox.getBoundingClientRect();
    const { Margin, Columns, ImgWidthPercent, ElNameMargin } = ClsBoxStyles;
    const _elNameH = 15 + ElNameMargin; // 15 为行高
    const _imgHeight = (clsBoxW / Columns) * ImgWidthPercent + Margin; // 这儿的 margin 是图片的底部 margin
    return _imgHeight + _elNameH + Margin; // 返回行高，这儿的 margin 是 item 元素底部的高度
  };

  _animate = (endHeight, animateTime = 500) => {
    const _millisec = 10;
    const _counts = animateTime / _millisec; // setInterval 循环次数
    const _step = endHeight / _counts;

    this._interval = setInterval(() => {
      const { height = 0 } = this.state;
      if (height < endHeight) {
        this.setState({ height: Math.ceil(height + _step) });
      } else {
        clearInterval(this._interval);
      }
    }, _millisec);
  };
}

// 原有的库
const elLibrary = [
  {
    label: '常用标号',
    value: 'common-sign',
    element: [
      {
        name: 'aaaaaaaaaaaaaaaaaa',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'bbb',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'ccc',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'ddd',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'eee',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      }
    ]
  },
  {
    label: '警用车辆',
    value: 'common-sign-1',
    element: [
      {
        name: 'aaaaaaaaaaaaaaaaaa',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'bbb',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'ccc',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'ddd',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'eee',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      },
      {
        name: 'fff',
        imgSrc:
          'http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg'
      }
    ]
  }
];
