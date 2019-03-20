import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { ChartName, PopulationLayerId } from './chart-info';
import { FetchHeatMapData } from './webapi';

export default class TotalPopulation extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  render() {
    const { selectedChart, selectedIndex, chartData } = this.props;
    const _selectIndex =
      selectedChart === ChartName.totalPop ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '人口分布' }}
          legend={{ text: '人口总数：85' }}
          data={[
            {
              label: '总人口',
              value: chartData.totalPop || 0,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '常驻',
              value: chartData.ckpop || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              code: 11
            },
            {
              label: '流动',
              value: chartData.lkpop || 0,
              startColor: '#fbdcd4',
              endColor: '#fed9fe',
              code: 12
            },
            {
              label: '重点',
              value: chartData.zdpop || 0,
              startColor: '#bbaddc',
              endColor: '#facff0',
              code: 'Y'
            },
            {
              label: '境外',
              value: chartData.jwpop || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              code: 20
            }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _clickBar = barInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curCell } = barInfo;
    let _selectInd;
    if (selectedChart === ChartName.totalPop) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchChartData(curCell.code); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.totalPop }); // 像父元素传参
  };

  _fetchChartData = async firstType => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchHeatMapData({
      firtype: firstType,
      points: {
        _sw: { lng: 116.07152456255062, lat: 36.62226357473202 },
        _ne: { lng: 117.16317543749153, lat: 36.88848218729613 }
      }
    });
    if (!res || err) return console.log('total-population 获取数据失败');
    // todo 显示到地图上
    this._removeSourceLayer(PopulationLayerId); // 删除图层
    const _features = res.map(item => {
      const { ZXDHZB, ZXDZZB, RKBM } = item;
      return TurfPoint([ZXDHZB, ZXDZZB], { code: RKBM });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    _MAP_.addLayer({
      id: PopulationLayerId,
      type: 'circle',
      source: _geoJSONData,
      paint: {
        'circle-color': '#f00',
        'circle-radius': 6
      }
    });
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}
