/**
 * @author sl 2017-03-07
 * @name 房屋饼状图
 * 1. 房屋总量
 * 2. 出租房屋
 * 3. 自住房屋
 * 4. 空置房屋
 */
import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { BuildingLayerId } from './chart-info';
import { FetchBuildingData } from './webapi';
import { AddPointLayer, AddNamePlateLayer, RemoveLayer } from './layer-control';

import { DefaultTab, TabValue } from '../constant';

export default class BuildingPie extends Component {
  state = {
    selectedIndex: -1
  };

  static defaultProps = {
    curBar: DefaultTab
  };

  _curCell = {};

  componentWillReceiveProps = nextProps => {
    const { curBar } = nextProps;
    if (curBar !== TabValue.unit) {
      // 未选中当前 tab，移除监听事件
      // 选中当前 tab，未选中当前图表，移除监听事件，删除图层
      RemoveLayer(_MAP_, BuildingLayerId); // 删除图层
      _MAP_.off('moveend', this._fetchData);
    }
  };

  render() {
    const { selectedIndex } = this.state;
    const { curBar } = this.props;
    if (curBar !== TabValue.building) return null;

    const _percentage = 1;
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '房屋' }}
          legend={{ text: '人口总数：65' }}
          data={[
            {
              value: _percentage,
              label: '出租',
              type: '2'
            },
            {
              value: 100 - _percentage,
              label: '自住',
              type: '1'
            }
          ]}
          selectedIndex={selectedIndex}
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _clickBar = barInfo => {
    const { selectedIndex } = this.state;
    const { curIndex, curCell } = barInfo; // 解构
    this._curCell = curCell;
    const _selected = curIndex === selectedIndex; // 之前是否选中当前的cell
    this.setState({
      selectedIndex: _selected ? -1 : curIndex
    });
    if (!_selected) {
      _MAP_.on('moveend', this._fetchData);
      _MAP_.flyTo({ zoom: 16.5 });
    } else {
      RemoveLayer(_MAP_, BuildingLayerId); // 删除图层
      _MAP_.off('moveend', this._fetchData);
    }
  };

  _fetchData = async () => {
    const _bounds = _MAP_.getBounds();
    const { type } = this._curCell;
    const { res, err } = await FetchBuildingData({
      points: _bounds,
      type: type
    });
    if (!res || err) return console.log('building-bar 获取数据失败');
    const _features = res.map(item => {
      const { hzb, zzb, dzbm } = item;
      return TurfPoint([hzb, zzb], {
        code: dzbm // 单位地址编码
      }); // 生成点数据
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddPointLayer(_MAP_, _geoJSONData);
  };
}
