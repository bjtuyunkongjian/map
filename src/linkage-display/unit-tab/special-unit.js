/**
 * @author sl 2019-03-06
 * @name 特种单位饼状图
 * 1. 娱乐服务
 * 2. 旧货
 * 3. 汽车租赁
 * 4. 金银加工
 * 5. 印刷
 * 6. 旅馆
 * 7. 典当
 * 8. 公章
 * 9. 开锁
 * 10. 废旧金属收购
 * 11. 机动车拆装
 * 12. 机动车修理
 * 13. 上网场所
 * 14. 保安
 * 15. 管制刀具
 * 16. 危爆行业
 */

import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import { CreateUid } from 'tuyun-utils';

import { ChartName, UnitLayerId } from './chart-info';
import { FetchUnitData, FetchNameplateData } from './webapi';
import { AddPointLayer, AddNamePlateLayer, RemoveLayer } from './layer-control';

import { DefaultTab, TabValue } from '../constant';

export default class SpecialUnit extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  _curCell = {};
  _shouldFetch = true; // 判断是否要请求一下一下数据
  _uuid = -1;

  componentWillReceiveProps = nextProps => {
    const { selectedIndex: preSelectedIndex } = this.props;
    const { curBar, selectedChart, selectedIndex } = nextProps;
    // 如果和选中的扇区和之前的不一致，需要重置 _shouldFetch
    if (
      selectedChart === ChartName.specialUnit &&
      selectedIndex !== preSelectedIndex
    ) {
      this._shouldFetch = true;
    }
    // 如果选中切换 tab，需要重置 _shouldFetch
    // 如果切换选中的图表，需要重置 _shouldFetch
    if (
      curBar !== TabValue.unit ||
      selectedChart !== ChartName.specialUnit ||
      selectedIndex < 0
    ) {
      // 未选中当前 tab，移除监听事件
      // 选中当前 tab，未选中当前图表，移除监听事件，删除图层
      this._shouldFetch = true;
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
      selectedChart === ChartName.specialUnit ? selectedIndex : -1;

    let _total = 0;
    Object.keys(chartData).map(item => {
      _total += chartData[item] || 0;
    });
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '特种单位' }}
          legend={{ text: `总数：${_total}` }}
          data={[
            {
              value: chartData.yule || 0,
              label: '娱乐服务',
              name: 'yule',
              code: '240'
            },
            {
              value: chartData.jiuhuo || 0,
              label: '旧货',
              name: 'jiuhuo',
              code: '216'
            },
            {
              value: chartData.qichezulin || 0,
              label: '汽车租赁',
              name: 'qichezulin',
              code: '219'
            },
            {
              value: chartData.jinyinjiagong || 0,
              label: '金银加工',
              name: 'jinyinjiagong',
              code: '217'
            },
            {
              value: chartData.yinshua || 0,
              label: '印刷',
              name: 'yinshua',
              code: '220'
            },
            {
              value: chartData.lvguan || 0,
              label: '旅馆',
              name: 'lvguan',
              code: '211'
            },
            {
              value: chartData.diandang || 0,
              label: '典当',
              name: 'diandang',
              code: '212'
            },
            {
              value: chartData.gongzhang || 0,
              label: '公章',
              name: 'gongzhang',
              code: '213'
            },
            {
              value: chartData.kaisuo || 0,
              label: '开锁',
              name: 'kaisuo',
              code: '215'
            },
            {
              value: chartData.jiujinshushougou || 0,
              label: '废旧金属收购',
              name: 'jiujinshushougou',
              code: '214'
            },
            {
              value: chartData.chaizhuang || 0,
              label: '机动车拆装',
              name: 'chaizhuang',
              code: '218'
            },
            {
              value: chartData.xiuli || 0,
              label: '机动车修理',
              name: 'xiuli',
              code: '221'
            },
            {
              value: chartData.shangwang || 0,
              label: '上网场所',
              name: 'shangwang',
              code: '280'
            },
            {
              value: chartData.baoan || 0,
              label: '保安',
              name: 'baoan',
              code: '291'
            },
            {
              value: chartData.guanzhidaoju || 0,
              label: '管制刀具',
              name: 'guanzhidaoju',
              code: '292'
            },
            {
              value: chartData.weibao || 0,
              label: '危爆行业',
              name: 'weibao',
              code: '230'
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
    if (selectedChart === ChartName.specialUnit) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    RemoveLayer(_MAP_, UnitLayerId); // 删除图层
    onSelect({ index: _selectInd, name: ChartName.specialUnit }); // 像父元素传参
  };

  _fetchData = () => {
    const { code } = this._curCell;
    const _zoom = _MAP_.getZoom();
    _zoom <= 16 ? this._fetchUnitData(code) : this._fetchNameplateData(code); // 获取数据，小于 16 级，获取热力图数据，大于 16 级，获取铭牌数据
  };

  // 获取热力图数据
  _fetchUnitData = async sectype => {
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchUnitData({
      firtype: '3',
      sectype: sectype,
      points: _bounds
    });
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
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
      const { hzb, zzb, zagldwbm } = item;
      return TurfPoint([hzb, zzb], {
        code: zagldwbm, // 单位地址编码
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
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchNameplateData({
      firtype: 2,
      thirtype: thirtype,
      points: _bounds,
      flag: 1
    });
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
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
