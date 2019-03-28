/**
 * @author sl 2017-03-07
 * @name 房屋饼状图
 * 1. 房屋总量
 * 2. 出租房屋
 * 3. 自住房屋
 * 4. 空置房屋
 */
import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { ChartName, BuildingLayerId } from './chart-info';
import { FetchNameplateData } from './webapi';
import { AddNamePlateLayer, RemoveLayer } from './layer-control';

import { DefaultTab, TabValue } from '../constant';

export default class BuildingBar extends Component {
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
      curBar !== TabValue.building ||
      selectedChart !== ChartName.buildingBar ||
      selectedIndex < 0
    ) {
      // 未选中当前 tab，移除监听事件
      // 选中当前 tab，未选中当前图表，移除监听事件，删除图层
      RemoveLayer(_MAP_, BuildingLayerId); // 删除图层
      _MAP_.off('moveend', this._fetchData);
    } else {
      // 选中当前图表，获取数据，添加监听事件
      _MAP_.on('moveend', this._fetchData);
    }
  };

  render() {
    const { selectedChart, selectedIndex, chartData, curBar } = this.props;
    if (curBar !== TabValue.building) return null;
    const _selectIndex =
      selectedChart === ChartName.buildingBar ? selectedIndex : -1;
    let _total = 0;
    Object.keys(chartData).map(key => {
      _total += chartData[key] || 0;
    });
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '房屋' }}
          legend={{ text: `房屋总数：${_total}` }}
          data={[
            {
              value: chartData.czfw || 0,
              label: '出租',
              startColor: '#bbaddc',
              endColor: '#facff0',
              type: '2',
              sectype: '3'
            },
            {
              value: chartData.zzfw || 0,
              label: '自住',
              startColor: '#bbaddc',
              endColor: '#facff0',
              type: '1',
              sectype: '2'
            },
            {
              value: chartData.kzfw || 0,
              label: '空置',
              startColor: '#bbaddc',
              endColor: '#facff0',
              type: '3',
              sectype: '4'
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
    this._curCell = curCell;
    if (selectedChart === ChartName.buildingBar) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchData(curCell.code); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.buildingBar }); // 像父元素传参
  };

  _fetchData = async () => {
    const _bounds = _MAP_.getBounds();
    const { sectype } = this._curCell;
    const { res, err } = await FetchNameplateData({
      firtype: 3,
      sectype: sectype,
      points: _bounds
    });
    if (!res || err) return;
    RemoveLayer(_MAP_, BuildingLayerId);
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num, enableClick: true });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddNamePlateLayer(_MAP_, _geoJSONData); // 添加铭牌
  };
}
