import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { AddCircleLayer, AddHeatMapLayer, RemoveLayer } from 'tuyun-utils';
import { FetchGeoRes } from './webapi';
import { GoRadioTower } from 'react-icons/go';
import { AddHeatMapLayer, RemoveLayer } from 'tuyun-utils';
export default class LeftMenu extends Component {
  state = {
    animate: '',
    selectedVal: '',
    showInfo: null,
    move: false,
    compareInfo: null
  };

  componentDidMount = () => {
    _MAP_.on('zoomend', () => {
      const { selectedVal } = this.state;
      if (!selectedVal) return;
      let data;
      if (jqCompare.value === selectedVal) {
      } else {
        data = menuItem.find(item => item.value === selectedVal).data;
      }
      if (!data) return;
      const _level = _MAP_.getZoom();
      if (_level >= 9) {
        AddCircleLayer(_MAP_, data, layerId, {
          color: originColor
        }); // 可以点击，显示点位图
        AddHeatMapLayer(_MAP_, geoJSONEmpty, layerIdHeat);
      } else {
        AddCircleLayer(_MAP_, geoJSONEmpty, layerId, {
          color: originColor
        }); // 可以点击，显示点位图
        AddHeatMapLayer(_MAP_, data, layerIdHeat);
      }
    });

    _MAP_.on('move', () => this.setState({ move: false }));

    // 点击非对比点
    _MAP_.on('click', layerId, e => {
      const { lat, lng } = e.lngLat;
      _MAP_.flyTo({ center: [lng, lat] });
      const { properties } = e.features[0];
      const { id } = properties;
      this.setState({ showInfo: properties });
      const { selectedVal } = this.state;
      const { data: geojson } = menuItem.find(
        item => item.value === selectedVal
      );
      if (!geojson) return;
      const { features } = geojson.data;
      for (let item of features) {
        item.properties.radius = item.properties.id === id ? 10 : 5;
      }
      AddCircleLayer(_MAP_, geojson, layerId, { color: originColor });
    });

    // 点击对比点
    _MAP_.on('click', layerIdCompare, e => {
      const { lat, lng } = e.lngLat;
      _MAP_.flyTo({ center: [lng, lat] });
      const { properties } = e.features[0];
      const { id } = properties;
      this.setState({ compareInfo: properties });
      const { data: geojson } = jqCompare;
      if (!geojson) return;
      const { features } = geojson.data;
      for (let item of features) {
        item.properties.radius = item.properties.id === id ? 10 : 5;
      }
      AddCircleLayer(_MAP_, geojson, layerIdCompare, {
        color: ['get', 'color']
      }); // 可以点击，显示点位图
    });
  };

  render() {
    const { animate, selectedVal, showInfo, compareInfo } = this.state;
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
                key={`munu_item_${index}`}
                onClick={() => this._addPoints(item)}
              >
                <div className="item-label">
                  <GoRadioTower />
                  <span>{item.label}</span>
                  <div className="arrow-box">
                    <span className="arrow arrow-right" />
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className={`menu-item ${
              selectedVal === jqCompare.value ? 'selected' : ''
            }`}
            onClick={() => this._addCompareLayer(jqCompare)}
          >
            <div className="item-label">
              <GoRadioTower />
              <span>{jqCompare.label}</span>
              <div className="arrow-box">
                <span className="arrow arrow-right" />
              </div>
            </div>
          </div>
        </div>

        <button className="control" onClick={this._toggleLeftMenu}>
          <span className={`aspect-left ${_slide}`} />
        </button>

        {showInfo && this._createShowInfo()}

        {compareInfo && this._createCompareInfo()}
      </div>
    );
  }

  _addPoints = async item => {
    this.setState({ selectedVal: item.value });
    const _zoom = _MAP_.getZoom();

    RemoveLayer(_MAP_, layerIdCompare);

    this.setState({ selectedVal: item.value, showInfo: null });

    this.setState({
      selectedVal: item.value,
      showInfo: null,
      compareInfo: null
    });

    const { err, res } = await FetchGeoRes({ type: item.value });
    if (err || !res) return;
    const _features = res.map(resItem => {
      const { oLat, oLng, iName, id } = resItem;
      const lng = parseFloat(oLng);
      const lat = parseFloat(oLat);
      return TurfPoint([lng, lat], { radius: 5, name: iName, lat, lng, id });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const _level = _MAP_.getZoom();
    item.data = _geoJSONData;
    if (_level >= 9) {
      AddCircleLayer(_MAP_, _geoJSONData, layerId, {
        color: originColor
      }); // 可以点击，显示点位图
    } else {
      AddHeatMapLayer(_MAP_, _geoJSONData, layerIdHeat);
    }
  };

  _addCompareLayer = async item => {
    RemoveLayer(_MAP_, layerId);
    RemoveLayer(_MAP_, layerIdHeat);
    this.setState({
      selectedVal: item.value,
      showInfo: null,
      compareInfo: null
    });
    const { err, res } = await FetchGeoRes({ type: item.value });

    if (err || !res) return;
    const _features = [];
    for (let resItem of res) {
      const { oLat, oLng, iLat, iLng, id, iName } = resItem;
      const _oLng = parseFloat(oLng);
      const _oLat = parseFloat(oLat);
      const _iLng = parseFloat(iLng);
      const _iLat = parseFloat(iLat);
      _features.push(
        TurfPoint([_iLng, _iLat], { radius: 5, id, color: originColor, iName })
      );
      _features.push(
        TurfPoint([_oLng, _oLat], { radius: 5, id, color: compareColor, iName })
      );
    }
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    item.data = _geoJSONData;
    AddCircleLayer(_MAP_, _geoJSONData, layerIdCompare, {
      color: ['get', 'color']
    }); // 可以点击，显示点位图
  };

  _createShowInfo = () => {
    const { showInfo } = this.state;
    const { lng, lat, name } = showInfo;
    const { x, y } = _MAP_.project([lng, lat]);
    return (
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x + 10,
          width: 255,
          background: 'white',
          padding: '10px 15px',
          borderRadius: 5,
          borderTopLeftRadius: 0,
          boxShadow: '5px 5px 5px grey'
        }}
      >
        <div>地址： {name}</div>
        {/* <div style={{ marginTop: 5 }}>经度： {lng}</div>
        <div style={{ marginTop: 5 }}>纬度： {lat}</div> */}
        <div
          style={{
            marginTop: 5,
            padding: 5,
            borderRadius: 2,
            border: '1px solid lightgray',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => this.setState({ showInfo: null })}
        >
          关闭
        </div>
      </div>
    );
  };

  _createCompareInfo = () => {
    const { compareInfo } = this.state;
    const { iName } = compareInfo;
    return (
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: document.body.clientWidth - 265,
          width: 255,
          background: 'white',
          padding: '10px 15px',
          borderRadius: 5,
          boxShadow: '5px 5px 5px grey'
        }}
      >
        <div>地址： {iName}</div>
        <div
          style={{
            marginTop: 5,
            padding: 5,
            borderRadius: 2,
            border: '1px solid lightgray',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => this.setState({ compareInfo: null })}
        >
          关闭
        </div>
      </div>
    );
  };

  _toggleLeftMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'menu-slide-in' ? 'menu-slide-out' : 'menu-slide-in'
    });
  };
}

const geoJSONEmpty = {
  type: 'geojson',
  data: FeatureCollection([])
};

const layerId = 'point-' + Math.random();
const layerIdCompare = 'point-compare-' + Math.random();
const layerIdHeat = 'point-heat-' + Math.random();

const originColor = '#F00';
const compareColor = '#0F0';

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

const jqCompare = {
  label: '警情对比',
  value: 'jq-compare'
};
