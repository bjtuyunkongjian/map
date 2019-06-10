// tab 页
const DefaultTab = 'population';
//
const TabValue = {
  population: 'population',
  unit: 'unit',
  building: 'building',
  case: 'case',
  alarm: 'alarm'
};

// 面板列表
const TabArr = [
  { label: '人口', value: TabValue.population, template: '服务民生' },
  { label: '单位', value: TabValue.unit, template: '警务综合' },
  { label: '房屋', value: TabValue.building, template: '社区民居' },
  { label: '案件', value: TabValue.case, template: '侦察打击' },
  { label: '报警', value: TabValue.alarm, template: '' }
];

export { DefaultTab, TabValue, TabArr };
