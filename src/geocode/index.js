import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { AddCircleLayer } from 'tuyun-utils';
import { FetchGeoRes } from './webapi';
import { GoRadioTower } from 'react-icons/go';

export default class LeftMenu extends Component {
  state = {
    animate: '',
    selectedVal: ''
  };

  componentDidMount = () => {};

  render() {
    const { animate, selectedVal } = this.state;
    const _slide = animate === 'menu-slide-in' ? '' : 'changed';
    return (
      <div className={`left-menu ${animate}`}>
        <div className="menu-box">
          {menuItem.map((item, index) => {
            return (
              <div
                className={`menu-item ${
                  selectedVal === item.value ? 'selected' : ''
                }`}
                onClick={() => this._addPoints(item)}
              >
                <div className="item-label" key={`munu_item_${index}`}>
                  <GoRadioTower />
                  <span>{item.label}</span>
                  <div className="arrow-box">
                    <span className="arrow arrow-right" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="control" onClick={this._toggleLeftMenu}>
          <span className={`aspect-left ${_slide}`} />
        </button>
      </div>
    );
  }

  _addPoints = async item => {
    this.setState({ selectedVal: item.value });
    const { err, res } = await FetchGeoRes({ type: item.value });
    if (err || !res) return;
    const _features = res.map(item => {
      const { oLat, oLng } = item;
      return TurfPoint([parseFloat(oLng), parseFloat(oLat)], { radius: 2 });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddCircleLayer(_MAP_, _geoJSONData, layerId, {
      color: '#000'
    }); // 可以点击，显示点位图
  };

  _toggleLeftMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'menu-slide-in' ? 'menu-slide-out' : 'menu-slide-in'
    });
  };
}

const layerId = 'point' + Math.random();

const menuItem = [
  {
    label: '警情',
    value: 'jingqing'
  },
  {
    label: '案件',
    value: 'anjian'
  },
  {
    label: '重点单位',
    value: 'zhongdiandanwei'
  },
  {
    label: '社保单位',
    value: 'shebaodanwei'
  },
  {
    label: '网吧',
    value: 'wangba'
  },
  {
    label: '自来水',
    value: 'zilaishui'
  },
  {
    label: '燃气',
    value: 'ranqi'
  }
];
