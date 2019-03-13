import React, { Component } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { IsArray, Event as GlobalEvent } from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { FetchPopulation } from './webapi';

export default class PopOption extends Component {
  state = {
    isChecked: false
  };

  componentDidMount = () => this._init();

  render() {
    const { isChecked } = this.state;
    return (
      <li
        className={`data-item ${isChecked ? 'checked' : ''}`}
        onClick={e => this._selectPopData()}
      >
        <div className={`checkbox ${isChecked ? 'checked' : ''}`}>
          {isChecked ? <IoMdCheckmark /> : null}
        </div>
        {popOption.name}
      </li>
    );
  }

  _init = () => {
    _MAP_.on('click', popOption.layerId, e => {
      const { lngLat, originalEvent, features } = e;
      _MAP_.flyTo({ center: [lngLat.lng, lngLat.lat], duration: 500 });
    });
  };

  _selectPopData = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
    if (!isChecked) {
      this._fetchPopulation();
      _MAP_.on('moveend', this._fetchPopulation);
    } else {
      _MAP_.off('moveend', this._fetchPopulation);
    }
  };

  _fetchPopulation = async () => {
    const _bounds = _MAP_.getBounds(); // 获取屏幕边界范围
    const _zoom = _MAP_.getZoom(); // 当前缩放层级
    const { res, err } = await FetchPopulation({ points: _bounds }); // 发送请求
    if (err || !IsArray(res)) return console.log('获取一标三识数据出错'); //保护
    const _features = res.map(coords => TurfPoint(coords));
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    this._removeSourceLayer(popOption.layerId);
    // 小于 17.5 级：多于 200 个点，以热力图形式呈现，在建筑物底下；
    if (_zoom < 17.5 && res.length > 200) {
      _MAP_.addLayer(
        {
          id: popOption.layerId,
          type: 'heatmap',
          source: _geoJSONData,
          paint: {
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.5,
              'green',
              0.8,
              'yellow',
              1,
              'red'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': 10,
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': 1
          }
        },
        'line-gd-ref'
      );
    } else if (_zoom < 17.5 && res.length <= 200) {
      // 小于 17.5 级：少于 200 个点，以点图形式呈现，在 3d 建筑物之上，可点击；
      _MAP_.addLayer({
        id: popOption.layerId,
        type: 'circle',
        source: _geoJSONData,
        // minzoom: 12,
        paint: {
          'circle-radius': 4,
          'circle-color': 'blue',
          'circle-blur': 0
        }
      });
    } else if (_zoom >= 17.5) {
      // 大于 17.5 级：点图，铭牌形式，在 3d 建筑物上面，自动避让，优先级最高；
      _MAP_.addLayer({
        id: popOption.layerId,
        type: 'circle',
        source: _geoJSONData,
        // minzoom: 12,
        paint: {
          'circle-radius': 4,
          'circle-color': 'blue',
          'circle-blur': 0
        }
      });
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const popOption = {
  value: 'population',
  name: '人口',
  defaultZoom: 16.5,
  icon: 'people',
  layerId: 'POLICE_DATA_POPULATION'
};
