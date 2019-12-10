/**
 * @author sl204984
 * @description 请求当前屏幕车辆并做动画
 * 1、“1” 获得车的第一个定位点信息，直接上图
 * 2、“2” 两点都纠偏了，且id都一样或两条路是连接着的，返回两点并截取路
 * 3、“3” 两点都纠偏了，但两条路无关，返回两点
 * 4、“4” 其中只有一点纠偏了，返回两点，两点之间渲染可以虚线显示连续行驶情况
 * 5、“5” 两点均未纠偏，返回两点
 */

import {
  FetchRequest,
  IsEmpty,
  CreateUid,
  AddCircleLayer,
  AddImageLayer,
  RemoveLayer
} from 'tuyun-utils';
import {
  point as TurfPoint,
  lineString as TurfLine,
  lineDistance as LineDistance,
  along as TurfAlong,
  lineSlice as LineSlice,
  featureCollection as FeatureCollection
} from 'turf';

export default class VehicleAnimation {
  constructor(
    map,
    {
      fetchParam,
      fetchUrl,
      vehicleLayer,
      hslColor = [0, 100, 50],
      rgbColor = [255, 0, 0],
      colorType,
      renderType = 'circle'
    }
  ) {
    this.map = map;
    this.fetchParam = fetchParam;
    this.fetchUrl = fetchUrl;
    this.vehicleLayer = vehicleLayer;
    this.renderType = renderType;
    // color
    const _opacity = 0.5;
    if (colorType === 'hsl') {
      const [hue, saturation, lightness] = hslColor;
      const _lightness = this.createHslOpacity(lightness, _opacity);
      this.deepColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      this.lightColor = `hsl(${hue}, ${saturation}%, ${_lightness}%)`;
    } else {
      const [red, green, blue] = rgbColor;
      this.deepColor = `rgb(${red}, ${green}, ${blue})`;
      this.lightColor = `rgba(${red}, ${green}, ${blue}, ${_opacity})`;
    }
    // data
    this.dataUid = -1;
    this.elapsedFrame = 0; // 10 秒内已经经过的时间
    this.vehicleMap = {}; // 车辆对应的数据
    this.resCarData = []; // 下一个数据
    // timer handle
    this.fpsIntervalHandle = -1;
    this.fetchIntervalHandle = -1;
    this.createTimeoutHandle = -1;
    // uuid
    this.uuid = -1;
    // 跑以一个阶段的路所需的时间
    this.roadTime = fetchInterval / 1000; // 单位：秒
    // 执行
    this.mount();
  }

  mount = () => {
    this.firstExecution();
    this.fetchIntervalHandle = setInterval(this.fetchData, fetchInterval);
    this.fpsIntervalHandle = setInterval(this.renderFrame, 1000 / fps);
    this.map.on('moveend', this.onMoveEnd); // 添加监听
  };

  firstExecution = async () => {
    // 第一次请求
    const _uuid = (this.uuid = CreateUid());
    const _start = new Date().getTime();
    const { res, err } = await this.fetchReq();
    if (!res || err) return;
    if (_uuid !== this.uuid) return; // 保护
    const _timeDiff = new Date().getTime() - _start;
    this.roadTime = (fetchInterval + delay - _timeDiff) / 1000; // 计算
    if (this.roadTime < 1) this.roadTime = 1; // 最小时间
    this.resCarData = res;
    this.createVehicleMap();
  };

  fetchData = async () => {
    this.createTimeoutHandle = setTimeout(this.createVehicleMap, delay);
    const _uuid = (this.uuid = CreateUid());
    const _start = new Date().getTime();
    const { res, err } = await this.fetchReq();
    if (!res || err) return;
    if (_uuid !== this.uuid) return; // 保护
    const _timeDiff = new Date().getTime() - _start;
    if (_timeDiff > delay) {
      this.roadTime = (fetchInterval - _timeDiff + delay) / 1000;
      if (this.roadTime < 1) this.roadTime = 1; // 最小时间
    } else {
      this.roadTime = fetchInterval / 1000;
    }
    this.resCarData = res;
  };

  onMoveEnd = async () => {
    const _uuid = (this.uuid = CreateUid());
    const { res, err } = await this.fetchReq();
    if (!res || err) return;
    if (_uuid !== this.uuid) return;
    if (IsEmpty(res)) {
      for (let item of res) {
        const { objectID, roadPoints, gpsPoints } = item;
        if (this.vehicleMap[objectID]) continue;
        const _road = roadPoints.length === 0 ? gpsPoints : roadPoints;
        const _end = gpsPoints[gpsPoints.length - 1]; // 最后一点
        let _geometry = TurfLine(_road); // 整个道路的 geometry
        const _length = LineDistance(_geometry, unit); // 单位：千米
        const _fpsSpeed = _length / this.roadTime / fps; // 千米 / 帧
        const _traveledRoad = _fpsSpeed * this.elapsedFrame; // 经过的路
        const _curGeometry = TurfAlong(_geometry, _traveledRoad, unit); // 当前到达的点
        _geometry = LineSlice(_curGeometry, _end, _geometry); // 剩余的路
        this.vehicleMap[objectID] = {
          end: _end,
          roadLine: _geometry,
          length: _length, // 单位：千米
          fpsSpeed: _fpsSpeed, // 单位：千米每帧
          color: _length > 0 ? this.deepColor : this.lightColor,
          radius: _length > 0 ? 5 : 3,
          rotate: 0
        };
      }
    } else {
      for (let item of res) {
        const { objectID, gpsPoints } = item;
        if (this.vehicleMap[objectID]) continue;
        this.vehicleMap[objectID] = {
          end: gpsPoints[gpsPoints.length - 1],
          roadLine: TurfLine(gpsPoints),
          length: 0, // 单位：千米
          fpsSpeed: 0, // 单位：千米每帧
          color: this.lightColor,
          radius: 3,
          rotate: 0
        };
      }
    }
  };

  fetchReq = () => {
    const _bounds = this.map.getBounds();
    // GPSServer/twoOneCurrentCar?
    // type=1&minx=114&maxx=121&miny=34&maxy=37
    const _param =
      `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
        _bounds._sw.lat
      }&maxY=${_bounds._ne.lat}&` + this.fetchParam;
    return FetchRequest({
      url: this.fetchUrl || 'GPSServer/twoOneCurrentCar?' + _param,
      method: 'GET'
    });
  };

  renderFrame = () => {
    this.elapsedFrame++;
    if (IsEmpty(this.vehicleMap)) return;
    if (this.renderType === 'circle') {
      this.renderCircle();
    } else {
      this.renderImage();
    }
  };

  renderCircle = () => {
    const _features = [];
    Object.keys(this.vehicleMap).map(key => {
      const {
        fpsSpeed,
        roadLine,
        length,
        end,
        color,
        radius
      } = this.vehicleMap[key];
      if (length === 0) {
        _features.push(TurfPoint(end, { objectID: key, color: color, radius }));
      } else {
        const _carGeometry = TurfAlong(roadLine, fpsSpeed, unit);
        _carGeometry.properties = {
          objectID: key,
          color: color,
          radius
        };
        _features.push(_carGeometry);
        this.vehicleMap[key].roadLine = LineSlice(_carGeometry, end, roadLine);
      }
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddCircleLayer(this.map, _geoJSONData, this.vehicleLayer, {
      color: ['get', 'color']
    });
  };

  renderImage = () => {
    const _features = [];
    Object.keys(this.vehicleMap).map(key => {
      const { fpsSpeed, roadLine, length, end, rotate } = this.vehicleMap[key];
      if (length === 0) {
        _features.push(TurfPoint(end, { objectID: key, opacity: 0.5, rotate }));
      } else {
        const _carGeometry = TurfAlong(roadLine, fpsSpeed, unit);
        const _rotate = this.computeAngle(
          roadLine.geometry.coordinates[0],
          _carGeometry.geometry.coordinates
        );
        _carGeometry.properties = {
          objectID: key,
          rotate: _rotate,
          opacity: 1
        };
        _features.push(_carGeometry);
        if (_rotate !== 0) this.vehicleMap[key].rotate = _rotate;
        this.vehicleMap[key].roadLine = LineSlice(_carGeometry, end, roadLine);
      }
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddImageLayer(this.map, _geoJSONData, this.vehicleLayer, {
      iconImage: 'ic_map_policecar',
      iconRotate: ['get', 'rotate'],
      iconOpacity: ['get', 'opacity'],
      allowOverlap: true
    });
  };

  createVehicleMap = () => {
    // 清空数据
    const _prevVehicleMap = this.vehicleMap;
    this.vehicleMap = {};
    this.elapsedFrame = 0;
    if (IsEmpty(this.resCarData)) return;
    // 重构数据
    this.resCarData.map(item => {
      const { objectID, roadPoints, gpsPoints } = item;
      const _road = [];
      let _rotate = 0;
      if (_prevVehicleMap[objectID]) {
        _rotate = _prevVehicleMap[objectID].rotate;
      }
      if (roadPoints.length === 0) {
        _road.push(...gpsPoints);
      } else {
        _road.push(...roadPoints);
      }
      const _geometry = TurfLine(_road);
      const _length = LineDistance(_geometry, unit); // 单位：千米
      let _color;
      let _radius;
      if (_length > 0) {
        _color = this.deepColor;
        _radius = 5;
      } else {
        _color = this.lightColor;
        _radius = 3;
      }
      this.vehicleMap[objectID] = {
        end: gpsPoints[gpsPoints.length - 1],
        roadLine: _geometry,
        length: _length, // 单位：千米
        fpsSpeed: _length / this.roadTime / fps, // 单位：千米每帧
        color: _color,
        radius: _radius,
        rotate: _rotate
      };
    });
    // 使用结束清空
    this.resCarData = [];
  };

  createHslOpacity = (lightness, alpha) => {
    return (100 - lightness) * (1 - alpha) + lightness;
  };

  computeAngle = (startPt, endPt) => {
    const _y = endPt[1] - startPt[1];
    const _x = endPt[0] - startPt[0];
    const _angle = 90 - (Math.atan(_y / _x) / Math.PI) * 180;
    if (_x < 0) {
      return _angle + 180;
    } else {
      return _angle;
    }
  };

  // 废除
  unmount = () => {
    clearInterval(this.fpsIntervalHandle); // 清空定时器
    clearInterval(this.fetchIntervalHandle); // 清空定时器
    clearTimeout(this.createTimeoutHandle);
    RemoveLayer(this.map, this.vehicleLayer); // 删除图层
    this.map.off('moveend', this.onMoveEnd); // 移除监听
    // data
    this.dataUid = -1;
    this.elapsedFrame = 0; // 10 秒内已经经过的时间
    this.vehicleMap = {}; // 车辆对应的数据
    this.resCarData = []; // 下一个数据
    // timer handle
    this.fpsIntervalHandle = -1;
    this.fetchIntervalHandle = -1;
    this.createTimeoutHandle = -1;
  };
}

const fetchInterval = 10 * 1000;
const fps = 20; // 帧每秒
const delay = 5 * 1000; // 延时时间
const unit = 'kilometers'; // 测量距离单位
