import { GlobalConst } from 'tuyun-utils';
// tab 页

const { tabValue, policeData } = GlobalConst;
const TabValue = tabValue;

const DefaultTab = '';

// 面板列表
const TabArr = [
  policeData.population,
  policeData.unit,
  policeData.building,
  policeData.poCase,
  policeData.poSituation
];

export { DefaultTab, TabValue, TabArr };
