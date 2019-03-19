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

import { ChartName } from './chart-info';

export default class ProtectionUnit extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  render() {
    const { selectedChart, selectedIndex, chartData } = this.props;
    const _selectIndex =
      selectedChart === ChartName.protectUnit ? selectedIndex : -1;
    console.log('chartData', chartData);
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '保护单位' }}
          legend={{ text: '人口总数：65' }}
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
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _clickBar = barInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curCell } = barInfo;
    let _selectInd;
    if (selectedChart === ChartName.protectUnit) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    onSelect({ index: _selectInd, name: ChartName.protectUnit }); // 像父元素传参
  };
}
