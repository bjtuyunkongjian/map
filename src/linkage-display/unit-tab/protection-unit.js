/**
 * @author sl 2019-03-06
 * @name 保护单位饼状图
 * 1. 新闻
 * 2. 学校
 * 3. 交通枢纽
 * 4. 加油站
 * 5. 国防科研
 * 6. 党政机关
 * 7. 电信
 * 8. 物流
 * 9. 银行
 * 10. 能源
 * 11. 物资储备
 */

import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { ChartName, UnitLayerId } from './chart-info';
import { FetchUnitData, FetchNameplateData } from './webapi';
import { AddPointLayer, AddNamePlateLayer, RemoveLayer } from './layer-control';

import { DefaultTab, TabValue } from '../constant';

export default class ProtectionUnit extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  _curCell = {};
  _shouldFetch = true; // 判断是否要请求一下一下数据

  componentWillReceiveProps = nextProps => {
    const { selectedIndex: preSelectedIndex } = this.props;
    const { curBar, selectedChart, selectedIndex } = nextProps;
    // 如果和选中的扇区和之前的不一致，需要重置 _shouldFetch
    if (
      selectedChart === ChartName.unitBar &&
      selectedIndex !== preSelectedIndex
    ) {
      this._shouldFetch = true;
    }
    // 如果选中切换 tab，需要重置 _shouldFetch
    // 如果切换选中的图表，需要重置 _shouldFetch
    if (
      curBar !== TabValue.unit ||
      selectedChart !== ChartName.protectUnit ||
      selectedIndex < 0
    ) {
      // 未选中当前 tab，移除监听事件
      // 选中当前 tab，未选中当前图表，移除监听事件，删除图层
      this._shouldFetch = true;
      RemoveLayer(_MAP_, UnitLayerId); // 删除图层
      _MAP_.off('moveend', this._fetchData);
    } else {
      // 选中当前图表，获取数据，添加监听事件
      this._shouldFetch && this._fetchData();
      this._shouldFetch = false;
      _MAP_.on('moveend', this._fetchData);
    }
  };

  render() {
    const { selectedChart, selectedIndex, chartData, curBar } = this.props;
    if (curBar !== TabValue.unit) return null;

    const _selectIndex =
      selectedChart === ChartName.protectUnit ? selectedIndex : -1;

    let _total = 0;
    Object.keys(chartData).map(item => {
      _total += chartData[item] || 0;
    });

    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '保护单位' }}
          legend={{ text: `总数：${_total}` }}
          data={[
            {
              value: chartData.xinwen || 0,
              label: '新闻',
              name: 'xinwen',
              code: '251'
            },
            {
              value: chartData.jiaoyu || 0,
              label: '学校',
              name: 'jiaoyu',
              code: '259'
            },
            {
              value: chartData.jiaotongshuniu || 0,
              label: '交通枢纽',
              name: 'jiaotongshuniu',
              code: '269'
            },
            {
              value: chartData.jiayouzhan || 0,
              label: '加油站',
              name: 'jiayouzhan',
              code: '268'
            },
            {
              value: chartData.keyan || 0,
              label: '国防科研',
              name: 'keyan',
              code: '252'
            },
            {
              value: chartData.dangzhenjiguan || 0,
              label: '党政机关',
              name: 'dangzhenjiguan',
              code: '271'
            },
            {
              value: chartData.dianxin || 0,
              label: '电信',
              name: 'dianxin',
              code: '253'
            },
            {
              value: chartData.wuliu || 0,
              label: '物流',
              name: 'wuliu',
              code: '254'
            },
            {
              value: chartData.yinhang || 0,
              label: '银行',
              name: 'yinhang',
              code: '255'
            },
            {
              value: chartData.nengyuan || 0,
              label: '能源',
              name: 'nengyuan',
              code: '256'
            },
            {
              value: chartData.wuzichubei || 0,
              label: '物资储备',
              name: 'wuzichubei',
              code: '257'
            }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _clickPie = barInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curSector } = barInfo;
    let _selectInd;
    this._curCell = curSector;
    if (selectedChart === ChartName.protectUnit) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    onSelect({ index: _selectInd, name: ChartName.protectUnit }); // 像父元素传参
  };

  _fetchData = () => {
    const { code } = this._curCell;
    const _zoom = _MAP_.getZoom();
    _zoom <= 16.5 ? this._fetchUnitData(code) : this._fetchNameplateData(code); // 获取数据，小于 16.5 级，获取热力图数据，大于 16.5 级，获取铭牌数据
  };

  // 获取热力图数据
  _fetchUnitData = async sectype => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchUnitData({
      sectype: sectype,
      points: _bounds
    });
    if (!res || err) return;
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
  _fetchNameplateData = async thirtype => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchNameplateData({
      firtype: 2,
      thirtype: thirtype,
      points: _bounds,
      flag: 2
    });
    if (!res || err) return;
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
