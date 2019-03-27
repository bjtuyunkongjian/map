const ChartName = {
  totalPop: 'total-population',
  keyPop: 'key-population',
  popDensity: 'pop-density'
};

// 16.5级以下，当前屏幕大于200人时用热力图，小于200人时用点位图
// 16.5级以上用3D+数字铭牌
const PopulationLayerId = 'LK_POPULATION_LAYER';

const PieData = [
  {
    dataIndex: 0,
    value: 0,
    key: 'wangan',
    label: '网安',
    name: 'wangan',
    code: '304000000000'
  },
  {
    dataIndex: 1,
    value: 0,
    key: 'jingzhen',
    label: '经侦',
    name: 'jingzhen',
    code: '405000000000'
  },
  {
    dataIndex: 2,
    value: 0,
    key: 'xingjing',
    label: '刑警',
    name: 'xingjing',
    code: '203000000000'
  },
  {
    dataIndex: 3,
    value: 0,
    key: 'huzhen',
    label: '户政',
    name: 'huzheng',
    code: '102000000000'
  },
  {
    dataIndex: 4,
    value: 0,
    key: 'jindu',
    label: '禁毒',
    name: 'jindu',
    code: '501000000000'
  },
  {
    dataIndex: 5,
    value: 0,
    key: 'qingbao',
    label: '情报',
    name: 'qingbao',
    code: '001000000000'
  },
  {
    dataIndex: 6,
    value: 0,
    key: 'guobao',
    label: '国保',
    name: 'guobao',
    code: '601000000000'
  },
  {
    dataIndex: 7,
    value: 0,
    key: 'fanxiejiao',
    label: '反邪教',
    name: 'fanxiejiao',
    code: '701000000000'
  },
  {
    dataIndex: 8,
    value: 0,
    key: 'fankong',
    label: '反恐',
    name: 'fankong',
    code: '801000000000'
  },
  {
    dataIndex: 9,
    value: 0,
    key: 'jiaojing',
    label: '交警',
    name: 'jiaojing',
    code: '901000000000'
  },
  {
    dataIndex: 10,
    value: 0,
    key: 'zeyu',
    label: '泽雨',
    name: 'zeyu',
    code: '120800000000'
  },
  {
    dataIndex: 11,
    value: 0,
    key: 'daoqie',
    label: '盗窃',
    name: 'daoqie',
    code: '051101050200'
  },
  {
    dataIndex: 12,
    value: 0,
    key: 'pohuairanbaoshebei',
    label: '破坏燃爆设备',
    name: 'pohuairanbaoshebei',
    code: '051502020205'
  },
  {
    dataIndex: 13,
    value: 0,
    key: 'qiangjie',
    label: '抢劫',
    name: 'qiangjie',
    code: '050102050100'
  },
  {
    dataIndex: 14,
    value: 0,
    key: 'guyishanghai',
    label: '故意伤害',
    name: 'guyishanghai',
    code: '051601040103'
  },
  {
    dataIndex: 15,
    value: 0,
    key: 'fandu',
    label: '制毒贩毒',
    name: 'fandu',
    code: '040200000000'
  },
  {
    dataIndex: 16,
    value: 0,
    key: 'feifajujin',
    label: '非法拘禁',
    name: 'feifajujin',
    code: '051601040109'
  },
  {
    dataIndex: 17,
    value: 0,
    key: 'qiangjian',
    label: '强奸',
    name: 'qiangjian',
    code: '050103040105'
  },
  {
    dataIndex: 18,
    value: 0,
    key: 'xidurenyuan',
    label: '吸毒',
    name: 'xidurenyuan',
    code: '040100000000'
  }
];

export { ChartName, PopulationLayerId, PieData };
