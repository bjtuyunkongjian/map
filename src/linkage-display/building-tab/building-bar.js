/**
 * @author sl 2017-03-07
 * @description 房屋饼状图
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
import {
  GlobalEvent,
  GloEventName,
  RemoveLayer,
  AddNamePlateLayer
} from 'tuyun-utils';

import { ChartName, BuildingLayerId } from './chart-info';
import { FetchNameplateData } from './webapi';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class BuildingBar extends Component {
  state = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  _curCell = {};

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { selectedChart, selectedIndex, chartData, curBar } = this.state;
    if (curBar !== TabValue.building) return null;
    const _selectIndex =
      selectedChart === ChartName.buildingBar ? selectedIndex : -1;
    let _total = chartData.totalFw || 0;
    const _baseValue = _total / 20;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          baseValue={_baseValue}
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

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav); // 切换 tab
    Event.on(EventName.updateBuiChart, this._onUpdateBuiChart); // 更新数据
    Event.on(EventName.changeBuiSelected, this._onChangeBuiSelected); // 切换选中的图表
  };

  /**
   * 切换 tab：
   * 1. 重置当前选中的 tab
   * 2. 重置选中的图表
   */

  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    this.setState({
      curBar: nextBar,
      selectedChart: '',
      selectedIndex: -1
    });
    _MAP_.off('moveend', this._fetchData);
  };

  _onUpdateBuiChart = ({ buildingBarData }) => {
    this.setState({ chartData: buildingBarData });
  };

  _onChangeBuiSelected = ({ selectedChart, selectedIndex }) => {
    this.setState({ selectedChart, selectedIndex });
    const _selectIndex =
      selectedChart === ChartName.buildingBar ? selectedIndex : -1;
    if (_selectIndex > -1) {
      this._fetchData();
      _MAP_.on('moveend', this._fetchData);
    } else {
      _MAP_.off('moveend', this._fetchData);
    }
  };

  _clickBar = barInfo => {
    const { selectedChart, selectedIndex } = this.state;
    const { curIndex, curCell } = barInfo;
    let _selectInd;
    this._curCell = curCell;
    if (selectedChart === ChartName.buildingBar) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchData(curCell.code); // 获取数据
    RemoveLayer(_MAP_, BuildingLayerId); // 删除图层
    GlobalEvent.emit(GloEventName.closePopupBuilding); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupBuiNameplate); // 切换图表，先关闭详情弹窗
    Event.emit(EventName.changeBuiSelected, {
      selectedChart: ChartName.buildingBar,
      selectedIndex: _selectInd
    });
  };

  _fetchData = async () => {
    const { curBar } = this.state;
    const _zoom = _MAP_.getZoom();
    if (_zoom < 16) return;
    const _bounds = _MAP_.getBounds();
    const { sectype } = this._curCell;
    const { res, err } = await FetchNameplateData({
      firtype: 3,
      sectype: sectype,
      points: _bounds
    });
    if (!res || err) return;
    if (curBar !== TabValue.building) return;
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num, enableClick: true });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddNamePlateLayer(_MAP_, _geoJSONData, BuildingLayerId); // 添加铭牌
  };
}
