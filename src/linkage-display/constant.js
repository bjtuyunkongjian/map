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
  { label: '人口', value: TabValue.population },
  { label: '单位', value: TabValue.unit },
  { label: '房屋', value: TabValue.building },
  { label: '案件', value: TabValue.case },
  { label: '报警', value: TabValue.alarm }
];

export { DefaultTab, TabValue, TabArr };
