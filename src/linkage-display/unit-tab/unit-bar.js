/**
 * @author sl 2019-03-06
 * @name 单位柱状图
 * 1. 全部单位
 * 2. 普通单位
 * 3. 特种单位
 * 4. 保护单位
 * 5. 九小场所
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { ChartName, UnitLayerId } from './chart-info';
import { FetchUnitData } from './webapi';

import { DefaultTab, TabValue } from '../constant';

export default class UnitBar extends Component {
  state = {
    selectedIndex: -1
  };

  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  render() {
    const { selectedChart, selectedIndex, chartData, curBar } = this.props;
    if (curBar !== TabValue.unit) return null;
    const _selectIndex =
      selectedChart === ChartName.unitBar ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '单位' }}
          legend={{ text: `总数：${chartData.totalDw || 0}` }}
          data={[
            {
              label: '全部',
              value: chartData.totalDw || 0,
              startColor: '#bbaddc',
              endColor: '#facff0',
              code: null
            },
            {
              label: '普通',
              value: chartData.ptdw || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              code: '2'
            },
            {
              label: '特种',
              value: chartData.tzdw || 0,
              startColor: '#fbdcd4',
              endColor: '#fed9fe',
              code: '3'
            },
            {
              label: '保护',
              value: chartData.bhdw || 0,
              startColor: '#bbaddc',
              endColor: '#facff0',
              code: '4'
            },
            {
              label: '九小场所',
              value: chartData.jxcs || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              code: '5'
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
    if (selectedChart === ChartName.unitBar) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchChartData(curCell.code); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.unitBar }); // 像父元素传参
  };

  _fetchChartData = async firstType => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchUnitData({
      firtype: firstType,
      points: {
        _sw: { lng: 116.07152456255062, lat: 36.62226357473202 },
        _ne: { lng: 117.16317543749153, lat: 36.88848218729613 }
      }
    });
    // todo 显示到地图上
    if (!res || err) return console.log('unit-bar');
    this._removeSourceLayer(UnitLayerId);
    const _features = res.map(item => {
      const { hzb, zzb, dzbm } = item;
      return TurfPoint([hzb, zzb], { code: dzbm });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    if (!_MAP_.getSource(UnitLayerId)) {
      _MAP_.addLayer({
        id: UnitLayerId,
        type: 'circle',
        source: _geoJSONData,
        paint: {
          'circle-color': '#f00',
          'circle-radius': 6
        }
      });
    } else {
      _MAP_.getSource(UnitLayerId).setData(_geoJSONData.data); // 重置 data
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}
