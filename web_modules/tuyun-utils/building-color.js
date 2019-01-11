import BuildingType from './building-type';

// const classifications = [
//   { name: '党政机关、电台', type: '0' },
//   { name: '学校', type: '1' },
//   { name: '医院', type: '2' },
//   { name: '大型商贸', type: '3' },
//   { name: '交通枢纽', type: '4' },
//   { name: '作废', type: '-1' }
// ];
const typeColor = {
  0: '#FF6A6A', // 党政机关、电台
  1: '#7CFC00', // 学校
  2: '#7CFC00', // 医院
  3: '#AB82FF', // 大型商贸
  4: '#7EC0EE' // 交通枢纽
};

const BuildingColor = {};

for (let key in BuildingType) {
  const _typeVal = BuildingType[key];
  BuildingColor[key] = typeColor[_typeVal];
}

export default BuildingColor;
