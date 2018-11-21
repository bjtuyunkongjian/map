/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import '../style/index.less';
import Map from './map';

class MapApp extends Component {

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <nav className="topnav">
          <table>
            <tr>
              <th>视图<span className='arrowdown'></span>
                <ul className='list1'>
                  <li>天地图视图</li>
                  <li>标准视图</li>
                  <li>欧标视图</li>
                  <li>夜间视图</li>
                  <li>卫星视图</li>
                </ul>
              </th>
              <th>配色<span className='arrowdown'></span>
                <ul className='list2'>
                  <li>交通</li>
                  <li>绿地</li>
                  <li>水系</li>
                  <li>居民地</li>
                  <li>境界线</li>
                  <span></span>
                  <li>恢复</li>
                </ul>
              </th>
              <th>路况</th>
              <th>测量<span className='arrowdown'></span>
                <ul className='list3'>
                  <li>查询</li>
                  <li>测距</li>
                  <li>侧面</li>
                  <li>标点</li>
                  <span></span>
                  <li>绘制</li>
                  <li>矩形</li>
                  <li>圆形</li>
                  <span></span>
                  <li>清空</li>
                </ul>
              </th>
              <th>筛选<span className='arrowdown'></span>
                <ul className='list4'>
                  <li>POI</li>
                  <li>地名</li>
                  <li>交通</li>
                  <li>绿地</li>
                  <li>水系</li>
                  <li>居民地</li>
                  <li>境界线</li>
                </ul>
              </th>
              <th>专题<span className='arrowdown'></span></th>
            </tr>
          </table>
        </nav>
        <Map />
      </div>
    )
  }
}

ReactDom.render(
  <MapApp />,
  document.getElementById('root')
);

$('.topnav table th:eq(0)').mouseenter(function () {
  $('.list1').css('display', 'block');
}).mouseleave(function () {
  $('.list1').css('display', 'none');
});
$('.topnav table th:eq(1)').mouseenter(function () {
  $('.list2').css('display', 'block');
}).mouseleave(function () {
  $('.list2').css('display', 'none');
});
$('.topnav table th:eq(3)').mouseenter(function () {
  $('.list3').css('display', 'block');
}).mouseleave(function () {
  $('.list3').css('display', 'none');
});
$('.topnav table th:eq(4)').mouseenter(function () {
  $('.list4').css('display', 'block');
}).mouseleave(function () {
  $('.list4').css('display', 'none');
});