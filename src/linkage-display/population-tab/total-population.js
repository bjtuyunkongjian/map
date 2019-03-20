import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { ChartName, PopulationLayerId } from './chart-info';
import { FetchHeatMapData, FetchNameplateData } from './webapi';
import {
  AddPointLayer,
  AddHeatMapLayer,
  AddNamePlateLayer,
  RemoveLayer
} from './layer-control';

import { DefaultTab, TabValue } from '../constant';

export default class TotalPopulation extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  _curCell = {};

  componentWillReceiveProps = nextProps => {
    const { curBar, selectedChart, selectedIndex } = nextProps;
    if (
      curBar !== TabValue.population ||
      selectedChart !== ChartName.totalPop ||
      selectedIndex < 0
    ) {
      // 未选中当前 tab，移除监听事件
      // 选中当前 tab，未选中当前图表，移除监听事件，删除图层
      RemoveLayer(_MAP_, PopulationLayerId); // 删除图层
      _MAP_.off('moveend', this._fetchData);
    } else {
      // 选中当前图表，获取数据，添加监听事件
      this._fetchData();
      _MAP_.on('moveend', this._fetchData);
    }
  };

  render() {
    const { selectedChart, selectedIndex, chartData, curBar } = this.props;
    const _selectIndex =
      selectedChart === ChartName.totalPop ? selectedIndex : -1;
    if (curBar !== TabValue.population) return null;

    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '人口分布' }}
          legend={{ text: `人口总数：${chartData.totalPop}` }}
          data={[
            {
              label: '总人口',
              value: chartData.totalPop || 0,
              startColor: '#bbaddc',
              endColor: '#facff0',
              code: undefined,
              sectype: 1
            },
            {
              label: '常驻',
              value: chartData.ckpop || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              code: 11,
              sectype: 2
            },
            {
              label: '流动',
              value: chartData.lkpop || 0,
              startColor: '#fbdcd4',
              endColor: '#fed9fe',
              code: 12,
              sectype: 3
            },
            {
              label: '重点',
              value: chartData.zdpop || 0,
              startColor: '#bbaddc',
              endColor: '#facff0',
              code: 'Y',
              sectype: 4
            },
            {
              label: '境外',
              value: chartData.jwpop || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              code: 20,
              sectype: 5
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
    if (_selectInd > -1) {
      this._curCell = curCell;
    }
    onSelect({ index: _selectInd, name: ChartName.totalPop }); // 像父元素传参
  };

  _fetchData = () => {
    const { code, sectype } = this._curCell;
    const _zoom = _MAP_.getZoom();
    _zoom <= 16.5
      ? this._fetchHeatMapData(code)
      : this._fetchNameplateData(sectype); // 获取数据，小于 16.5 级，获取热力图数据，大于 16.5 级，获取铭牌数据
  };

  // 获取热力图数据
  _fetchHeatMapData = async firtype => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchHeatMapData({
      firtype: firtype,
      points: _bounds
    });
    if (!res || err) return console.log('total-population 获取数据失败');
    // todo 显示到地图上
    RemoveLayer(_MAP_, PopulationLayerId); // 删除图层
    const _features = res.map(item => {
      const { ZXDHZB, ZXDZZB, RKBM } = item;
      return TurfPoint([ZXDHZB, ZXDZZB], { code: RKBM });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    // 点的个数大于 200，显示热力图
    if (res.length > 200) {
      AddHeatMapLayer(_MAP_, _geoJSONData);
    } else {
      // 点的个数小于 200，显示点位图
      AddPointLayer(_MAP_, _geoJSONData);
    }
  };

  // 获取铭牌数据
  _fetchNameplateData = async sectype => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchNameplateData({
      firtype: 1,
      sectype: sectype,
      points: _bounds
    });
    if (!res || err) return console.log('total-population 获取数据失败');
    RemoveLayer(_MAP_, PopulationLayerId); // 删除图层
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddNamePlateLayer(_MAP_, _geoJSONData); // 添加铭牌
  };
}
