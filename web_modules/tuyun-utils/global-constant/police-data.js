/**
 * @author sl204984
 * @description 一标三实
 */
import TabValue from './tab-value';

const population = {
  value: TabValue.population,
  label: '人口',
  color: '#f44c4c',
  template: '服务民生'
};

const unit = {
  value: TabValue.unit,
  label: '单位',
  color: '#ffcc42',
  template: '警务综合'
};

const building = {
  value: TabValue.building,
  label: '房屋',
  color: '#65db42', //#65db42
  template: '社区民居'
};

const poCase = {
  value: TabValue.case,
  label: '案件',
  color: '#5c71ff',
  template: '侦察打击'
};

const poSituation = {
  value: TabValue.posituation,
  label: '警情',
  color: '#d847e4',
  template: '执法监督'
};

export default { population, unit, building, poCase, poSituation };
