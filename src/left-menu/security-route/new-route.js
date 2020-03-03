import React, { Component } from 'react';
import { lineString as LineString, point as TurfPoint } from 'turf';
import { TuyunMessage, TuyunModal } from 'tuyun-kit';
import { GlobalEvent, GloEventName, RemoveLayer } from 'tuyun-utils';
import {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  DrawNodePoint,
  RouteLayers
} from './security-route-layer';
import {
  GetRouteFirst,
  GetRoadIds,
  PostRoutePlus,
  GetRoutePenult,
  GetRouteLast,
  SaveScurityRoute,
  GetAllRoutes
} from './webapi';

export default class NewRoute extends Component {
  state = {
    enableStart: false,
    enableEnd: false,
    enableCancel: false,
    enableSave: false,
    showContinueBtn: false,
    showModel: false
  };

  _newRoute = undefined; // 壳子
  _input = undefined; // 输入框
  _roadFeatures = []; // 选中的路
  _startEndFeatures = []; // 起始点和终点 feature
  _roadNode = []; // 选中路的节点，撤销使用
  _lineRingFeatures = []; // 环形路
  _toSelectFeatures = []; // 待选择的点

  componentDidMount = () => this._init();
  componentWillUnmount = () => this._reset();

  render() {
    const {
      enableStart,
      enableEnd,
      enableCancel,
      enableSave,
      showContinueBtn,
      showModel
    } = this.state;
    return (
      <div className="new-route" ref={el => (this._newRoute = el)}>
        <div className="title">设置安保路线方案</div>

        <div className="route-row">
          <div className="route-label">方案名称：</div>
          <div className="input-box">
            <input
              type="text"
              className="input"
              ref={input => (this._input = input)}
            />
          </div>
        </div>

        <div className="point-set">
          <div
            className={`start-btn ${enableStart ? 'disabled' : ''}`}
            onClick={this._setStartPoint}
          >
            设置起点
          </div>
          <div
            className={`end-btn ${enableEnd ? '' : 'disabled'}`}
            onClick={this._selectEndPoint}
          >
            设置终点
          </div>
        </div>

        <div className="btn-container">
          <div
            className={`cancel-btn ${enableCancel ? '' : 'disabled'}`}
            onClick={this._cancelSelection}
          >
            {showContinueBtn ? '继续选择' : '撤销'}
          </div>
          <div
            className={`save-btn ${enableSave ? '' : 'disabled'}`}
            onClick={() => this._verifyRepeat()}
          >
            保存
          </div>
        </div>

        <TuyunModal
          title="重复的方案名称"
          visible={showModel}
          onOk={() => this._coverRepeat()}
          onCancel={() => this.setState({ showModel: false })}
        >
          该方案名称已经存在，是否覆盖之前方案？
        </TuyunModal>
      </div>
    );
  }

  _init = () => {
    _MAP_.on('click', this._drawStartPoint); // 点击起点，起点可以随意设置
    _MAP_.on('click', RouteLayers.toSelect, this._chooseRoutePoint); // 点击选择路的点
    _MAP_.on('click', RouteLayers.lineRingRoute, this._chooseLineRing); // 点击选择环形路
    _MAP_.on('click', RouteLayers.endRoute, this._setEndPoint); // 设置终点
  };

  _reset = () => {
    _MAP_.off('click', this._drawStartPoint); // 点击起点，起点可以随意设置
    _MAP_.off('click', RouteLayers.toSelect, this._chooseRoutePoint); // 点击选择路的点
    _MAP_.off('click', RouteLayers.lineRingRoute, this._chooseLineRing); // 点击选择环形路
    _MAP_.off('click', RouteLayers.endRoute, this._setEndPoint); // 设置终点
    Object.keys(RouteLayers).map(key => {
      const _val = RouteLayers[key];
      RemoveLayer(_MAP_, _val);
    });
    this._newRoute = undefined; // 壳子
    this._input = undefined; // 输入框
    this._roadFeatures = []; // 选中的路
    this._startEndFeatures = []; // 起始点和终点 feature
    this._roadNode = []; // 选中路的节点，撤销使用
    this._lineRingFeatures = []; // 环形路
    this._toSelectFeatures = []; // 待选择的点
    this.setState({
      enableStart: false,
      enableEnd: false,
      showContinueBtn: false,
      enableCancel: false,
      enableSave: false
    }); // 重置
  };

  _setStartPoint = () => {
    const { enableStart } = this.state;
    if (!enableStart) this.setState({ enableStart: true });
    _MAP_.getZoom() < 15 && _MAP_.flyTo({ zoom: 15 });
  };

  _drawStartPoint = async e => {
    const { enableStart } = this.state; // 点击设置起点后 enableStart 为 true
    if (!enableStart || _MAP_.getLayer(RouteLayers.routeStart)) return; // 如果有 routeStart 这个层级，说明设置了起点
    const _bounds = _MAP_.getBounds(); // 获取屏幕边界
    const _coord = e.lngLat; // 获取点击的坐标点
    DrawStartPoint(_MAP_, _coord); // 绘制点击的起始点
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    // minx=116&maxx=116.&miny=36&maxy=36&x=116&y=36
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&x=${_coord.lng}&y=${_coord.lat}`;
    const { res, err } = await GetRouteFirst(_param);
    GlobalEvent.emit(closeGlobalLoading); // 关闭加载的弹窗
    if (err || !res) return; // 保护
    this._toSelectFeatures = []; // 清空待选择的点
    for (let item of res.points) {
      const { coordinates, startPoint, userData } = item;
      if (startPoint) {
        const _ind = userData.indexOf('true'); // 起始点
        userData.splice(_ind, 1); // 在前端删除 start "true" 属性后返回给后端
        this._roadNode.push(item); // 添加节点
        const _feature = TurfPoint([coordinates[0].x, coordinates[0].y]); // 生成起点映射点 feature
        this._startEndFeatures.push(_feature); // 起点映射点的 feature
      } else {
        const { x, y } = coordinates[0];
        const _feature = TurfPoint([x, y], { coordInfo: item });
        this._toSelectFeatures.push(_feature); // 待选择的点
      }
    }
    DrawIconPoint(_MAP_, {
      id: RouteLayers.startEndMapping,
      features: this._startEndFeatures,
      iconImage: 'security_route'
    }); // 绘制映射点
    DrawIconPoint(_MAP_, {
      id: RouteLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    }); // 绘制待选择的点
    // this.setState({ enableEnd: true, enableCancel: false, enableSave: false }); // 可以设置终点，禁止取消和缓存
  };

  // 选择下一个点
  _chooseRoutePoint = async e => {
    const { properties } = e.features[0]; // 解构 properity
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    this.setState({ enableEnd: false, enableCancel: false, enableSave: false }); // 禁止取消和保存按钮
    const _prev = this._roadNode[this._roadNode.length - 1]; // 前一个点击的节点
    const _suff = JSON.parse(properties.coordInfo); // 当前选中的点， coordInfo 中包含待选择的信息
    const { x, y } = _suff.coordinates[0];
    const _duration = 500; // 动画时间
    _MAP_.flyTo({ center: [x, y], zoom: 15, duration: _duration }); // 动画
    await new Promise(resolve => {
      setTimeout(() => resolve(), _duration * 1.01);
    }); // 设置定时器，保证与动画同步
    RemoveLayer(_MAP_, RouteLayers.toSelect); // 删除待选择图层 ======> 解决重绘延时问题
    const _roodIds = await this._getRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _body = {
      coordinatePrev: _prev.coordinates[0],
      coordinateNext: _suff.coordinates[0],
      userDataPre: _prev.userData,
      userDataNext: _suff.userData,
      ids: _roodIds
    }; // 请求参数
    const { res, err } = await PostRoutePlus(_body); // 获取道路和点
    GlobalEvent.emit(closeGlobalLoading); // 关闭加载的弹窗
    if (!res || err) return console.log('未返回当前道路和待选择的点'); // 保护
    const { isLineRing, coord } = res;
    this._lineRingFeatures = []; // 清空环形路 features
    this._roadNode.push(_suff); // 添加路节点
    this._toSelectFeatures = []; // 清空待选择点的 features
    for (let item of coord) {
      const { coordinates } = item;
      if (item.type !== 'LineString') {
        // 类型：点
        const { x, y } = coordinates[0];
        const _feature = TurfPoint([x, y], { coordInfo: item });
        this._toSelectFeatures.push(_feature); // 待选择的点的 features
      } else if (isLineRing) {
        // 类型：环形路
        const _coords = coordinates.map(coord => [coord.x, coord.y]); // 环形路坐标点
        const _feature = LineString(_coords, {
          index: this._lineRingFeatures.length // 添加环形路索引
        }); // 环形路 features
        this._lineRingFeatures.push(_feature); // 添加环形路 feature
      } else {
        // 类型：普通的路
        const _coords = coordinates.map(coord => [coord.x, coord.y]); // 普通路坐标点
        const _feature = LineString(_coords, {
          index: this._roadFeatures.length
        }); // 普通路的 features
        this._roadFeatures.push(_feature);
      }
    } // 遍历
    // 如果是环形路，先绘制环形路；如果不是环形路，直接绘制待选择的点
    if (isLineRing) {
      DrawRoad(_MAP_, {
        id: RouteLayers.lineRingRoute,
        features: this._lineRingFeatures,
        lineColor: '#800',
        lineWidth: 8
      }); // 绘制环形路
    } else {
      DrawRoad(_MAP_, {
        id: RouteLayers.selectedRoute,
        features: this._roadFeatures,
        lineColor: '#888',
        lineWidth: 8
      }); // 绘制整个路
      DrawIconPoint(_MAP_, {
        id: RouteLayers.toSelect,
        features: this._toSelectFeatures,
        iconImage: 'security_route_start'
      }); // 绘制待点击的点
      this.setState({ enableEnd: true, enableCancel: true, enableSave: true }); // 可以取消和保存
    }
  };

  _chooseLineRing = e => {
    const { index } = e.features[0].properties;
    const _feature = this._lineRingFeatures[index]; // 生成 feature
    this._roadFeatures.push(_feature); // 添加 feature
    RemoveLayer(_MAP_, RouteLayers.lineRingRoute); // 删除环形路
    DrawRoad(_MAP_, {
      id: RouteLayers.selectedRoute,
      features: this._roadFeatures,
      lineColor: '#888',
      lineWidth: 8
    }); // 绘制整个路
    DrawIconPoint(_MAP_, {
      id: RouteLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    }); // 绘制待点击的点
    this.setState({ enableEnd: true, enableCancel: true, enableSave: true }); // 可以取消和保存
  };

  _selectEndPoint = async () => {
    const { enableEnd } = this.state;
    if (!enableEnd) return; // 正在加载
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    const _suff = this._roadNode[this._roadNode.length - 1]; // 最后一个点
    this.setState({ enableEnd: false, enableCancel: false, enableSave: false }); //
    const { x, y } = _suff.coordinates[0];
    // const _param = { x, y, userData: _suff.userData }; // 参数
    let _param = `x=${x}&y=${y}`; // 参数
    for (let item of _suff.userData) {
      _param += `&userData=${item}`;
    }
    const _duration = 500; // 动画时间
    _MAP_.flyTo({ center: [x, y], zoom: 15, duration: _duration }); // 动画
    await new Promise(resolve => {
      setTimeout(() => resolve(), _duration * 1.01);
    }); // 设置定时器
    const _roodIds = await this._getRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    let { res, err } = await GetRoutePenult(_param); // 获取终止点
    GlobalEvent.emit(closeGlobalLoading); // 显示加载的弹窗
    const _features = [];
    if (err) return;
    for (let item of res) {
      const { coordinates } = item;
      const _roadCoords = coordinates.map(coord => [coord.x, coord.y]);
      _features.push(LineString(_roadCoords));
    }
    RemoveLayer(_MAP_, RouteLayers.toSelect); // 删除图层
    DrawRoad(_MAP_, {
      id: RouteLayers.endRoute,
      features: _features,
      lineColor: '#099',
      lineWidth: 8
    });
    this.setState({ enableEnd: true, enableCancel: true, enableSave: true });
  };

  _setEndPoint = async e => {
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    this.setState({ enableEnd: false, enableCancel: false, enableSave: false });
    const _roodIds = await this._getRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1]; // 最后一个点
    const { x: prevX, y: prevY } = _prev.coordinates[0];
    // preX=116&preY=36&userData=088b3c47-fcf3-4766-acf4-6ffd4d541eed&curX=116&curY=36
    let _param = `preX=${prevX}&preY=${prevY}&curX=${e.lngLat.lng}&curY=${
      e.lngLat.lat
    }`;
    for (let item of _prev.userData) {
      _param += `&userData=${item}`;
    }
    const { res, err } = await GetRouteLast(_param); // 发送请求
    GlobalEvent.emit(closeGlobalLoading); // 关闭加载的弹窗
    if (!res || err) return;
    for (let item of res) {
      const { coordinates } = item;
      if (item.type === 'LineString') {
        const _roadCoords = coordinates.map(coord => [coord.x, coord.y]);
        const _feature = LineString(_roadCoords, {
          index: this._roadFeatures.length
        });
        this._roadFeatures.push(_feature);
      } else {
        const _feature = TurfPoint([coordinates[0].x, coordinates[0].y]);
        this._startEndFeatures.push(_feature);
      }
      RemoveLayer(_MAP_, RouteLayers.endRoute); // 删除图层
    }
    DrawRoad(_MAP_, {
      id: RouteLayers.selectedRoute,
      features: this._roadFeatures,
      lineColor: '#888',
      lineWidth: 8
    });
    DrawIconPoint(_MAP_, {
      id: RouteLayers.startEndMapping,
      features: this._startEndFeatures,
      iconImage: 'security_route'
    });
    this.setState({ enableEnd: true, enableCancel: true, enableSave: true });
  };

  _getRoadIds = async () => {
    const _bounds = _MAP_.getBounds(); // 获取当前屏幕内的 roadIds
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}`;
    const { res, err } = await GetRoadIds(_param);
    return err ? undefined : res;
  };

  _cancelSelection = e => {
    e.stopPropagation();
    const { enableCancel, showContinueBtn } = this.state;
    if (!enableCancel) return;
    if (!showContinueBtn) {
      // 可以撤销
      DrawNodePoint(_MAP_, this._roadNode); // 绘制节点
      RemoveLayer(_MAP_, RouteLayers.toSelect); // 删除图层
      this.setState({ showContinueBtn: true });
      // 撤销道路
      _MAP_.on('click', RouteLayers.selectedRoute, this._clickSelectedRoute);
    } else {
      // 不可以撤销
      DrawIconPoint(_MAP_, {
        id: RouteLayers.toSelect,
        features: this._toSelectFeatures,
        iconImage: 'security_route_start'
      }); // 绘制待选择的点
      this.setState({ showContinueBtn: false });
      RemoveLayer(_MAP_, RouteLayers.routeNode); // 删除节点
      _MAP_.off('click', RouteLayers.selectedRoute, this._clickSelectedRoute);
      this._continueSelect();
    }
  };

  _clickSelectedRoute = e => {
    const { index } = e.features[0].properties;
    if (index === 0) return TuyunMessage.warning('不能撤销起始路线！');
    const _spliceLen = this._roadFeatures.splice(index).length;
    this._roadNode.splice(-_spliceLen);
    // 撤销道路
    DrawRoad(_MAP_, {
      id: RouteLayers.selectedRoute,
      features: this._roadFeatures,
      lineColor: '#888',
      lineWidth: 8
    });
    DrawNodePoint(_MAP_, this._roadNode); // 绘制节点
  };

  _continueSelect = async () => {
    this.setState({ enableEnd: false, enableCancel: false, enableSave: false });
    const _prev = this._roadNode[this._roadNode.length - 2]; // 前一个点
    const _suff = this._roadNode[this._roadNode.length - 1]; // 当前选中的点
    const { x, y } = _suff.coordinates[0];
    const _duration = 500; // 动画时间
    _MAP_.flyTo({ center: [x, y], zoom: 15, duration: _duration }); // 动画
    await new Promise(resolve => {
      setTimeout(() => resolve(), _duration * 1.01);
    }); // 设置定时器
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    const _roodIds = await this._getRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护

    const _body = {
      coordinatePrev: _prev.coordinates[0],
      coordinateNext: _suff.coordinates[0],
      userDataPre: _prev.userData,
      userDataNext: _suff.userData,
      ids: _roodIds
    }; // 请求参数
    const { res, err } = await PostRoutePlus(_body); // 获取道路和点
    GlobalEvent.emit(closeGlobalLoading); // 显示加载的弹窗
    if (!res || err) return console.log('未返回当前道路和待选择的点'); // 保护
    const { coord } = res;
    this._toSelectFeatures = []; // 绘制待选择的点的 features
    for (let item of coord) {
      if (item.type === 'LineString') continue; // 如果不是点，继续
      const { coordinates } = item;
      const { x, y } = coordinates[0];
      const _feature = TurfPoint([x, y], { coordInfo: item });
      this._toSelectFeatures.push(_feature);
    }
    DrawIconPoint(_MAP_, {
      id: RouteLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    });
    this.setState({ enableEnd: true, enableCancel: true, enableSave: true });
  };

  _verifyRepeat = async () => {
    const { enableSave } = this.state;
    if (!enableSave) return; // 禁用保存
    const _fileName = this._input.value; // 文件内容
    if (!_fileName) return TuyunMessage.warning('请输入方案名称');
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    const { res, err } = await GetAllRoutes();
    GlobalEvent.emit(closeGlobalLoading); // 关闭加载的弹窗
    if (!res || err) return; // 加载已有路线失败
    if (res.indexOf(_fileName) > -1) this.setState({ showModel: true });
    else this._saveSecurityRoute();
  };

  _coverRepeat = async () => {
    await this.setState({ showModel: false });
    this._saveSecurityRoute();
  };

  _getAllRoutes = async () => {
    const { res, err } = await GetAllRoutes();
    return new Promise(resolve => {
      resolve({ existRoutes: !err ? res : undefined });
    });
  };

  _saveSecurityRoute = async () => {
    const _fileName = this._input.value; // 文件名称
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading); // 显示加载的弹窗
    this.setState({ enableEnd: false, enableCancel: false, enableSave: false });
    const { res, err } = await SaveScurityRoute({
      fileName: _fileName,
      jsonString: JSON.stringify({ features: this._roadFeatures })
    });
    GlobalEvent.emit(closeGlobalLoading); // 关闭加载的弹窗
    if (res && !err) TuyunMessage.show('保存成功');
    this.setState({ enableEnd: false, enableCancel: false, enableSave: false });
    this._reset();
  };
}
