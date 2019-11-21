const Padding = {
  top: 5,
  right: 10,
  bottom: 5,
  left: 10
};

const Title = {
  text: '',
  align: 'center', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
  fontSize: 16,
  fontWeight: 'blod', // blod, normal
  color: 'black',
  fontFamily: '微软雅黑'
};

const SubTitle = {
  text: '',
  align: 'center', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
  fontSize: 11,
  color: '#888',
  fontFamily: '微软雅黑'
};

const PromptWidth = 110; // 提示信息框的宽度
const PromptGap = 10; // 提示框距离鼠标的横向距离

const areaList = [
  {
    label: '辖区一',
    color: '#FFAA2C'
  },
  {
    label: '辖区二',
    color: '#48E6D7'
  }
];
const BarColors = [
  [35, 100, 59], // rgb: [255, 170, 44]
  [174, 76, 59], // rgb: [72, 230, 215]
  [14, 52, 55], // rgb: [200, 110, 82]
  [150, 31, 62], // rgb: [128, 188, 158]
  [32, 75, 42], // rgb: [189, 115, 27]
  [138, 19, 47], // rgb: [98, 143, 112]
  [13, 20, 61], // rgb: [175, 145, 136]
  [220, 3, 37], // rgb: [91, 93, 97]
  [205, 16, 31], // rgb: [67, 82, 93]
  [208, 14, 75] // rgb: [184, 193, 201]
]; // hsl 格式

export { Padding, Title, SubTitle, PromptWidth, PromptGap, BarColors };
