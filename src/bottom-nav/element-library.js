import React, { Component } from 'react';
import { IoIosClose, IoIosResize, IoIosArrowDown } from 'react-icons/io';
import MenuItems from './menu-items';
import Event from './event';
import { UploadImages } from './webapi';

export default class ElementLibrary extends Component {
  state = {
    curMenu: -1
  };

  _curZoom = 0;

  componentWillMount() {
    this._dealWithEvent();
  }

  render() {
    const { curMenu } = this.state;
    return (
      <div
        className={`element-library ${
          curMenu === MenuItems.markPlot ? '' : 'hidden'
        }`}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="library-header">
          <IoIosResize className="btn-text" width={20} />
          <span>元件库</span>
          <IoIosClose
            className="btn-text"
            size={20}
            onClick={this._closeElementLibrary}
          />
        </div>

        <div className="library-body">
          <div className="select-all">选择全部</div>
          <div className="input-box">
            <input type="text" placeholder="请输入想要查找的内容" />
          </div>

          <div className="element-box">
            {elLibrary.map((classification, clsIndex) => (
              <div key={`classification_${clsIndex}`}>
                <div className="classification-label">
                  <IoIosArrowDown />
                  <span className="label-name">{classification.label}</span>
                </div>
                <ul className="classification">
                  {classification.element.map((element, elIndex) => (
                    <li className="element-item" key={`element_${elIndex}`}>
                      {element.name}
                    </li>
                  ))}
                </ul>

                <input
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={this._uploadImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  };

  _closeElementLibrary = () => {
    Event.emit('change:curMenu', -1);
  };

  _selectCity = async cityInfo => {
    const { cityName } = this.state;
    this._curZoom = _MAP_.getZoom();
    cityName !== cityInfo.name && Event.emit('change:cityName', cityInfo.name);
    _MAP_.flyTo({ center: cityInfo.center, zoom: 10 });
  };

  _uploadImage = async e => {
    const _uploadFile = e.target.files;
    await UploadImages(_uploadFile);
  };
}

const elLibrary = [
  {
    label: '常用标号',
    element: [{ name: 'aaa' }, { name: 'bbb' }, { name: 'ccc' }]
  }
];
