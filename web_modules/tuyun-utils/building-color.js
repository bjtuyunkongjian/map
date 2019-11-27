import BuildingType from './building-type-hz';

// const classifications = [
//   { name: '党政机关、电台', type: '0' },
//   { name: '学校', type: '1' },
//   { name: '医院', type: '2' },
//   { name: '大型商贸', type: '3' },
//   { name: '交通枢纽', type: '4' },
//   { name: '作废', type: '-1' }
// ];
// 蓝色
// rgb(131, 157, 202) ===========> 预留色
const typeColor = {
  0: 'rgb(230, 145, 135)', // 党政机关、电台 红色 'rgb(230, 145, 135)',
  1: 'rgb(116, 211, 208)', // 学校
  2: 'rgb(116, 211, 208)', // 医院
  3: 'rgb(197, 172, 201)', // 大型商贸
  4: 'rgb(197, 172, 201)' // 交通枢纽
};

const BuildingColor = {};

for (let key in BuildingType) {
  const _typeVal = BuildingType[key];
  BuildingColor[key] = typeColor[_typeVal];
}

export default BuildingColor;
