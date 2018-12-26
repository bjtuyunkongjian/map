/**
 * @author sl204984
 * 写一个内联样式，将可能受到影响的下拉样式都改掉
 */

/* 
  .classification {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    .element-item {
      
      .element-img-box {
        width: 80%;
        padding-bottom: 80%; // padding百分比相对父元素宽度计算 
        height: 0;
        position: relative;
        overflow: hidden;
        margin-top: @margin / 2;
        .element-img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      .element-name {
        margin-top: 2px;

        display: block;
        // word-break: break-all;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
*/

const MarginBottom = 5;
const Columns = 5;
const ImgWidthPercent = 0.8;

const Styles = {
  'classification-box': { padding: 0, margin: 0 },
  classification: { padding: 0, margin: 0 },
  'element-item': {
    display: 'flex',
    flex: `0 ${100 / Columns}%`,
    marginBottom: MarginBottom
  },
  'element-img-box': {
    width: `${ImgWidthPercent * 100}%`
  }
};

export { MarginBottom, Columns, Styles };
