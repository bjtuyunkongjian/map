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

export default class SpecialUnit extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;

    return (
      <div className="charts-box">
        <TuyunPie
          width="100%"
          height={200}
          title={{ text: '特种单位' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 435, label: '娱乐服务' },
            { value: 310, label: '旧货' },
            { value: 234, label: '汽车租赁' },
            { value: 135, label: '金银加工' },
            { value: 435, label: '印刷' },
            { value: 310, label: '旅馆' },
            { value: 234, label: '典当' },
            { value: 135, label: '公章' },
            { value: 435, label: '开锁' },
            { value: 310, label: '废旧金属收购' },
            { value: 234, label: '机动车拆装' },
            { value: 135, label: '机动车修理' },
            { value: 435, label: '上网场所' },
            { value: 310, label: '保安' },
            { value: 234, label: '管制刀具' },
            { value: 435, label: '危爆行业' }
          ]}
          selectedIndex={selectedIndex}
          onClick={param => {
            this.setState({
              selectedIndex:
                param.curIndex === selectedIndex ? -1 : param.curIndex
            });
          }}
        />
      </div>
    );
  }
}
