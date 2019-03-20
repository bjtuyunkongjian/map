const ChartName = {
  totalPop: 'total-population',
  keyPop: 'key-population',
  popDensity: 'pop-density'
};

// 16.5级以下，当前屏幕大于200人时用热力图，小于200人时用点位图
// 16.5级以上用3D+数字铭牌
const PopulationLayerId = 'LK_POPULATION_LAYER';

export { ChartName, PopulationLayerId };
