import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

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
    return (
      <div className="classification-box" ref={el => (this._clsBox = el)}>
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
    return (
      <ul className="classification" style={{ height }}>
        {classification.element.map((element, elIndex) => (
          <li className="element-item" key={`element_${elIndex}`}>
            <div className="element-img-box">
              <img
                src="http://img5.imgtn.bdimg.com/it/u=1539384982,463814683&fm=26&gp=0.jpg"
                alt={element.name}
                className="element-img"
              />
            </div>
            <div className="element-name">{element.name}</div>
          </li>
        ))}
      </ul>
    );
  };

  _toggleShow = async classification => {
    const { visibleValue } = this.state;
    const _toHide = visibleValue === classification.value;
    clearInterval(this._interval); // 清除定时器
    if (_toHide) {
      await this.setState({ visibleValue: '', height: 0 });
    } else {
      await this.setState({ visibleValue: classification.value, height: 0 });
      const _rows = Math.ceil(
        (classification.element.length - 1) / this._columns
      );
      console.log('_clsBox', this._clsBox.getBoundingClientRect());
      this._animate(_rows * 69, 500);
    }
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
      { name: 'aaaaaaaaaaaaaaaaaa', alt: 'aaa' },
      { name: 'bbb', alt: 'bbb' },
      { name: 'ccc', alt: 'ccc' },
      { name: 'ddd', alt: 'ddd' },
      { name: 'eee', alt: 'eee' },
      { name: 'fff', alt: 'fff' }
    ]
  },
  {
    label: '警用车辆',
    value: 'common-sign-1',
    element: [
      { name: 'aaaaaaaaaaaaaaaaaa', alt: 'aaa' },
      { name: 'bbb', alt: 'bbb' },
      { name: 'ccc', alt: 'ccc' },
      { name: 'ddd', alt: 'ddd' },
      { name: 'eee', alt: 'eee' },
      { name: 'fff', alt: 'fff' }
    ]
  }
];
