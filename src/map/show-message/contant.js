export const PopCategory = {
  czrk: '常口',
  ldrk: '流口',
  jwrk: '境外',
  zdrk: '重点',
}; // 人口类别

// 人口信息
export const BaseInfo = [
  { label: '姓名', value: '张三', key: 'xm' },
  { label: '性别', value: '男', key: 'xb' },
  { label: '出生日期', value: '1987-10-10', key: 'csrq' },
  { label: '身份证', value: '1245677899098766655', key: 'sfzhm' },
  { label: '联系电话', value: '87972653', key: 'lxdh' },
  { label: '人口类别', value: '常驻 ', key: 'rklb' },
]; // 基本信息

export const HouseholdRegInfo = [
  { label: '户籍地', value: 'xx省xx市', key: 'hjd' },
  { label: '地址', value: 'xx街道xxx单元xx号', key: 'dzmc' },
  { label: '所属市局', value: 'xx派出所', key: 'sssj' },
  { label: '所属责任区', value: 'xx区', key: 'sszrq' },
  { label: '所属分县局', value: '', key: 'ssfxj' },
  { label: '所属派出所', value: 'xx派出所', key: 'sspcs' },
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
  { czrkNum: 2, ldrkNum: 1, zdryNum: 0 },
  { czrkNum: 1, ldrkNum: 1, zdryNum: 1 },
  { czrkNum: 3, ldrkNum: 2, zdryNum: 2 },
  { czrkNum: 4, ldrkNum: 3, zdryNum: 1 },
  { czrkNum: 2, ldrkNum: 1, zdryNum: 0 },
  { czrkNum: 1, ldrkNum: 1, zdryNum: 1 },
  { czrkNum: 3, ldrkNum: 2, zdryNum: 2 },
  { czrkNum: 4, ldrkNum: 3, zdryNum: 1 },
  { czrkNum: 2, ldrkNum: 1, zdryNum: 0 },
  { czrkNum: 1, ldrkNum: 1, zdryNum: 1 },
  { czrkNum: 3, ldrkNum: 2, zdryNum: 2 },
  { czrkNum: 4, ldrkNum: 3, zdryNum: 1 },
];

export const SelectedRoom = {
  personInfoList: [{ zdrybz: '常住人口' }, { xm: '张三' }, { syrkgllbdm: 11 }],
};

export const PersonInfoList = [
  { zdrybz: '常住人口', value: '', key: 'czrk' },
  { xm: '张三', key: 'sex' },
  { syrkgllbdm: 11, key: 'sss' },
];
