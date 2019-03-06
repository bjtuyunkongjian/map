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

const Legend = {
  text: '',
  align: 'center', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
  fontSize: 11,
  color: '#888',
  fontFamily: '微软雅黑'
};

const PromptWidth = 100; // 提示信息框的宽度
const PromptGap = 10; // 提示框距离鼠标的横向距离

/** 
  function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [Math.floor(h*360), Math.round(s*100)+"%", Math.round(l*100)+"%"];
  }
*/
const SectorColors = [
  [357, 69, 42], // rgb: [179, 33, 38]
  [206, 29, 20], // rgb: [36, 53, 66]
  [186, 31, 45], // rgb: [80, 143, 151]
  [14, 52, 55], // rgb: [200, 110, 82]
  [150, 31, 62], // rgb: [128, 188, 158]
  [32, 75, 42], // rgb: [189, 115, 27]
  [138, 19, 47], // rgb: [98, 143, 112]
  [13, 20, 61], // rgb: [175, 145, 136]
  [220, 3, 37], // rgb: [91, 93, 97]
  [205, 16, 31], // rgb: [67, 82, 93]
  [208, 14, 75] // rgb: [184, 193, 201]
]; // hsl 格式

export { Padding, Title, Legend, PromptWidth, PromptGap, SectorColors };
