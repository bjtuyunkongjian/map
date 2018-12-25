import React, { Component } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export default class ClassificationBox extends Component {
  state = {};
  render() {
    return (
      <div className="classification-box">
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
    );
  }
}

const elLibrary = [
  {
    label: '常用标号',
    element: [
      { name: 'aaa' },
      { name: 'bbb' },
      { name: 'ccc' },
      { name: 'ddd' },
      { name: 'eee' },
      { name: 'fff' }
    ]
  }
];
