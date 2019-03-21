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
import { FetchUnitData, FetchNameplateData } from './webapi';
import { AddPointLayer, AddNamePlateLayer, RemoveLayer } from './layer-control';

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

  componentWillReceiveProps = nextProps => {
    const { curBar, selectedChart, selectedIndex } = nextProps;
    if (
      curBar !== TabValue.unit ||
      selectedChart !== ChartName.unitBar ||
      selectedIndex < 0
    ) {
      // 未选中当前 tab，移除监听事件
      // 选中当前 tab，未选中当前图表，移除监听事件，删除图层
      RemoveLayer(_MAP_, UnitLayerId); // 删除图层
      _MAP_.off('moveend', this._fetchData);
    } else {
      // 选中当前图表，获取数据，添加监听事件
      this._fetchData();
      _MAP_.on('moveend', this._fetchData);
    }
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

  _fetchData = () => {
    const { code, sectype } = this._curCell;
    const _zoom = _MAP_.getZoom();
    _zoom <= 16.5
      ? this._fetchUnitData(code)
      : this._fetchNameplateData(sectype); // 获取数据，小于 16.5 级，获取热力图数据，大于 16.5 级，获取铭牌数据
  };

  // 获取热力图数据
  _fetchUnitData = async firtype => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchUnitData({
      firtype: firtype,
      points: _bounds
    });
    if (!res || err) return console.log('total-population 获取数据失败');
    // todo 显示到地图上
    RemoveLayer(_MAP_, UnitLayerId); // 删除图层
    let _circleRadius,
      _enableClick = false;
    // 点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
    // 点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
    // 点的数据量在 200 以内，现有点的大小，需要有点击功能
    if (res.length < 200) {
      _circleRadius = 6;
      _enableClick = true;
    } else if (res.length < 1000) {
      _circleRadius = 4;
    } else {
      _circleRadius = 2;
    }
    const _features = res.map(item => {
      const { hzb, zzb, dzbm } = item;
      return TurfPoint([hzb, zzb], {
        code: dzbm, // 单位地址编码
        radius: _circleRadius,
        enableClick: _enableClick
      }); // 生成点数据
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    // 点的个数大于 200，显示热力图
    if (res.length > 200) {
      AddPointLayer(_MAP_, _geoJSONData);
    } else {
      // 点的个数小于 200，显示点位图
      AddPointLayer(_MAP_, _geoJSONData);
    }
  };

  // 获取铭牌数据
  _fetchNameplateData = async sectype => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchNameplateData({
      firtype: 2,
      sectype: sectype,
      points: _bounds
    });
    if (!res || err) return console.log('total-population 获取数据失败');
    RemoveLayer(_MAP_, UnitLayerId); // 删除图层
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num, enableClick: true }); // 支持点击事件
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddNamePlateLayer(_MAP_, _geoJSONData); // 添加铭牌
  };
}
