const LabelColor = '#888';
const PromptWidth = 100; // 提示信息框的宽度
const PromptGap = 10; // 提示框距离鼠标的横向距离

const Padding = {
  top: 5,
  right: 10,
  bottom: 5,
  left: 10
};

const Title = {
  text: '示例',
  align: 'center', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
  fontSize: 16,
  fontWeight: 'blod', // blod, normal
  color: 'black',
  fontFamily: '微软雅黑'
};

const Legend = {
  text: '注释',
  align: 'right', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
  fontSize: 11,
  color: LabelColor,
  fontFamily: '微软雅黑'
};

export { PromptWidth, PromptGap, Padding, Title, Legend, LabelColor };
