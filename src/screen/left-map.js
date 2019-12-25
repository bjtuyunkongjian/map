import React, { Component } from 'react';

export default class LeftMap extends Component {
  state = {};

  render() {
    return (
      <div className="left-map">
        <div className="map-container">
          <div className="total-population">
            <div className="label">人口总数:</div>
            <div className="num-container">0</div>
            <div className="pun-container">,</div>
            <div className="num-container">0</div>
            <div className="num-container">0</div>
            <div className="num-container">0</div>
            <div className="pun-container">,</div>
            <div className="num-container">0</div>
            <div className="num-container">0</div>
            <div className="num-container">0</div>
            <div className="pun-container">,</div>
            <div className="num-container">0</div>
            <div className="num-container">0</div>
            <div className="num-container">0</div>
          </div>
          <div className="img-container">
            {cityList.map((item, index) => {
              return (
                <div
                  className="city-btn"
                  key={index}
                  style={{ left: item.left, bottom: item.bottom }}
                  onClick={() => {
                    window.location.href = '';
                  }}
                >
                  {item.name}
                  <em></em>
                </div>
              );
            })}
            <img className="map-img" src="./static/map.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

// 根据地图计算相对位置
const lng = [114.13474218750116, 123.3632578124936];
const lat = [34.35957640929948, 38.296657814240405];
const diffLng = lng[1] - lng[0];
const diffLat = lat[1] - lat[0];
const cityList = [
  { name: '滨州', value: 'binzhou', center: [117.994584, 37.39252] },
  { name: '德州', value: 'dezhou', center: [116.340858, 37.452006] },
  { name: '东营', value: 'dongying', center: [118.67273, 37.452006] },
  { name: '菏泽', value: 'heze', center: [115.44856, 35.239107] },
  { name: '济南', value: 'jinan', center: [117.114183, 36.631092] },
  { name: '济宁', value: 'jining', center: [116.578804, 35.429464] },
  { name: '莱芜', value: 'laiwu', center: [117.673356, 36.226584] },
  { name: '聊城', value: 'liaocheng', center: [115.970614, 36.469289] },
  { name: '临沂', value: 'linqin', center: [118.351503, 35.132032] },
  { name: '青岛', value: 'qingdao', center: [120.385942, 36.071919] },
  { name: '日照', value: 'rizhao', center: [119.529336, 35.441362] },
  { name: '泰安', value: 'taian', center: [117.078491, 36.226584] },
  { name: '威海', value: 'weihai', center: [122.111051, 37.535287] },
  { name: '潍坊', value: 'weifang', center: [119.148622, 36.726271] },
  { name: '烟台', value: 'yantai', center: [121.444802, 37.487698] },
  { name: '枣庄', value: 'zaozhuang', center: [117.30454, 34.846496] },
  { name: '淄博', value: 'zibo', center: [118.042173, 36.821449] }
];
for (let item of cityList) {
  item.left = ((item.center[0] - lng[0]) / diffLng) * 100 + '%';
  item.bottom = ((item.center[1] - lat[0]) / diffLat) * 100 + '%';
}
