/**
 * @author sl204984
 * 为了下拉动画计算
 * 写一个内联样式，将可能受到影响的下拉样式都改掉
 * 在 classification-box.less 中不要使用 !important
 */

const Margin = 5;
const Columns = 5;
const ImgWidthPercent = 0.8;
const ElNameMargin = 2;

const Styles = {
  'classification-box': { padding: 0, margin: 0 },
  classification: { padding: 0, margin: 0, display: 'flex' },
  'element-item': {
    display: 'flex',
    flex: `0 ${100 / Columns}%`,
    margin: `0 0 ${Margin}px 0`,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  },
  'element-img-box': {
    width: `${ImgWidthPercent * 100}%`,
    padding: `0 0 ${ImgWidthPercent * 100}% 0`,
    margin: `${Margin}px 0 0 0`,
    height: 0
  },
  'element-name': {
    margin: `${ElNameMargin}px 0 0 0`,
    padding: 0,
    width: `${ImgWidthPercent * 100}%`
  }
};

export { Margin, Columns, ImgWidthPercent, ElNameMargin, Styles };
