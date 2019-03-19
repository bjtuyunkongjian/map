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

import { ChartName } from './chart-info';

export default class SpecialUnit extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  render() {
    const { selectedChart, selectedIndex, chartData } = this.props;
    const _selectIndex =
      selectedChart === ChartName.specialUnit ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '特种单位' }}
          legend={{ text: '人口总数：65' }}
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
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _clickBar = barInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curCell } = barInfo;
    let _selectInd;
    if (selectedChart === ChartName.specialUnit) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    onSelect({ index: _selectInd, name: ChartName.specialUnit }); // 像父元素传参
  };
}
