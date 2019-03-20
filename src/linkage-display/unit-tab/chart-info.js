const ChartName = {
  unitBar: 'unit-bar',
  specialUnit: 'special-unit',
  protectUnit: 'protect-unit'
};

// 点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
// 点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
// 点的数据量在 200 以内，现有点的大小，需要有点击功能

const UnitLayerId = 'LK_UNIT_LAYER';

export { ChartName, UnitLayerId };
