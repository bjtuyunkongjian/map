export const PopCategory = {
  czrk: '常口',
  ldrk: '流口',
  jwrk: '境外',
  zdrk: '重点',
}; // 人口类别

// 人口信息
export const BaseInfo = [
  { label: '姓名', value: '', key: 'xm' },
  { label: '性别', value: '', key: 'xb' },
  { label: '出生日期', value: '', key: 'csrq' },
  { label: '身份证', value: '', key: 'sfzhm' },
  { label: '联系电话', value: '', key: 'lxdh' },
  { label: '人口类别', value: '', key: 'rklb' },
]; // 基本信息

export const HouseholdRegInfo = [
  { label: '户籍地', value: '', key: 'hjd' },
  { label: '地址', value: '', key: 'dzmc' },
  { label: '所属市局', value: '', key: 'sssj' },
  { label: '所属责任区', value: '', key: 'sszrq' },
  { label: '所属分县局', value: '', key: 'ssfxj' },
  { label: '所属派出所', value: '', key: 'sspcs' },
]; // 户籍信息

export const TotalRkNum = {
  allczrkNum: 3890,
  allldrkNum: 2608,
  allzdryNum: 88,
};
export const RoomInfoList = [
  { czrkNum: 2, ldrkNum: 1, zdryNum: 0 },
  { czrkNum: 1, ldrkNum: 1, zdryNum: 1 },
  { czrkNum: 3, ldrkNum: 2, zdryNum: 2 },
  { czrkNum: 4, ldrkNum: 3, zdryNum: 1 },
];

export const SelectedRoom = {
  personInfoList: [{ zdrybz: '常住人口' }, { xm: '张三' }, { syrkgllbdm: 11 }],
};
