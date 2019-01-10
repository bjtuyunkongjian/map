import React, { Component } from 'react';
import { FetchRequest } from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';

export default class ColorBuildings extends Component {
  state = {
    curIndex: -1,
    curType: -1,
    buildingId: -1
  };

  _isLoading = false;
  _hoveredStateId = null;
  _curFeature = undefined;
  _features = [];

  componentDidMount = () => this._init();

  render() {
    const { left, top, curIndex } = this.state;
    if (!left || !top) return null;
    return (
      <ul
        style={{
          position: 'absolute',
          left,
          top,
          backgroundColor: 'white',
          zIndex: 9,
          cursor: 'pointer',
          borderRadius: '3px'
        }}
      >
        {classifications.map((item, index) => (
          <li
            key={`class_${index}`}
            style={{
              width: 110,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid lightgray',
              color: curIndex === index ? 'gray' : 'black'
            }}
            onClick={e => this._setBuilding(item, index, e)}
          >
            {item.name}
          </li>
        ))}
        <li
          style={{
            width: 110,
            height: 24,
            display: 'flex',
            alignItems: 'center'
            // justifyContent: 'center',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid lightgray'
            }}
            onClick={() => this._cancel()}
          >
            取消
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => this._confirm()}
          >
            确定
          </div>
        </li>
      </ul>
    );
  }

  _init = () => {
    this._clickBuilding();
    const _features = storage.getItem('features');
    this._features = JSON.parse(_features) || [];
    setTimeout(() => {
      _MAP_.addLayer({
        id: colorLayerId,
        type: 'fill-extrusion',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this._features
          }
        },
        paint: {
          'fill-extrusion-color': '#2319DC',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            16,
            0,
            16.05,
            ['*', ['+', ['get', 'H'], 1], 3.1]
          ],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.7
        }
      });
    }, 2000);
  };

  _clickBuilding = () => {
    const _gresplArr = ['GRESPL_1_3D', 'GRESPL_2_3D', 'GRESPL_3_3D'];
    for (let item of _gresplArr) {
      _MAP_.on('contextmenu', item, e => {
        // console.log(
        //   '_MAP_.getLayer(item)',
        //   // _MAP_.getLayer(item),
        //   _MAP_.querySourceFeatures('addLv15', {
        //     sourceLayer: 'GRESPL_Merge_ID1'
        //   }),
        //   _MAP_.querySourceFeatures('GRESPL_Merge_ID1')
        // );
        this.setState({
          left: e.point.x + 10,
          top: e.point.y + 10,
          curIndex: -1,
          curType: -1,
          buildingId: '' + e.features[0].properties.ID
        });
        this._curFeature = {
          type: 'Feature',
          geometry: e.features[0].geometry,
          properties: e.features[0].properties
        };
        if (!_MAP_.getSource(curColorLayerId)) {
          _MAP_.addLayer({
            id: curColorLayerId,
            type: 'fill-extrusion',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [this._curFeature]
              }
            },
            paint: {
              'fill-extrusion-color': '#00bb00',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                16,
                0,
                16.05,
                ['*', ['+', ['get', 'H'], 1], 3.1]
              ],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.7
            }
          });
        } else {
          _MAP_.getSource(curColorLayerId).setData({
            type: 'FeatureCollection',
            features: [this._curFeature]
          });
        }
      });
    }
  };

  _setBuilding = (item, index, event) => {
    this.setState({ curIndex: index, curType: item.type });
    event.stopPropagation();
  };

  _cancel = () => {
    this.setState({
      left: undefined,
      top: undefined,
      curIndex: -1,
      curType: -1
    });
    this._removeCurLayer(); // 删除当前图层
  };

  _confirm = async () => {
    if (this._isLoading) return;

    const { curType, buildingId } = this.state;
    if (curType === undefined || curType === -1)
      return TuyunMessage.info('请选择类型！请选择类型！请选择类型！');
    const _body = {
      test: 'dataCollect',
      type: curType,
      id: buildingId
    };
    this._isLoading = true; // 正在加载
    const { res, err } = await FetchRequest({
      url: 'mapServer/string',
      method: 'POST',
      body: _body
    });
    this._isLoading = false; // 正在加载
    res && !err
      ? TuyunMessage.show('保存成功')
      : TuyunMessage.warning('保存失败');
    this.setState({
      left: undefined,
      top: undefined,
      curIndex: -1,
      curType: -1
    });
    if (curType === '-1') {
      const _chosenFeatures = this._features.filter(item => {
        return item.properties.ID === this._curFeature.properties.ID;
      });
      _chosenFeatures.map(item => {
        const _index = this._features.indexOf(item);
        this._features.splice(_index, 1);
      });
    } else {
      this._features.push(this._curFeature);
    }
    storage.setItem('features', JSON.stringify(this._features));
    this._removeCurLayer(); // 删除当前图层
  };

  _removeCurLayer = () => {
    _MAP_.getLayer(curColorLayerId) &&
      _MAP_.removeLayer(curColorLayerId).removeSource(curColorLayerId);
    if (!_MAP_.getSource(colorLayerId)) {
      _MAP_.addLayer({
        id: colorLayerId,
        type: 'fill-extrusion',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this._features
          }
        },
        paint: {
          'fill-extrusion-color': '#2319DC',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            16,
            0,
            16.05,
            ['*', ['+', ['get', 'H'], 1], 3.1]
          ],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.7
        }
      });
    } else {
      _MAP_.getSource(colorLayerId).setData({
        type: 'FeatureCollection',
        features: this._features
      });
    }
  };
}

const classifications = [
  { name: '党政机关、电台', type: '0' },
  { name: '学校', type: '1' },
  { name: '医院', type: '2' },
  { name: '大型商贸', type: '3' },
  { name: '交通枢纽', type: '4' },
  { name: '作废', type: '-1' }
];

const colorLayerId = 'COLOR_LAYER_ID';
const curColorLayerId = 'CURRENT_COLOR_LAYER_ID';
const storage = window.localStorage;
