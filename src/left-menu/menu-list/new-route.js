import React, { Component } from 'react';
import {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  DrawNodePoint,
  RouteLayers
} from './security-route-layer';
import { FetchRoadInfo, SaveScurityRoute } from './webapi';
import { TuyunMessage } from 'tuyun-kit';
import { lineString as LineString, point as TurfPoint } from 'turf';

export default class NewRoute extends Component {
  state = {
    enableStart: false,
    enableEnd: false,
    showContinueBtn: false
  };

  _newRoute = undefined; // 壳子
  _input = undefined; // 输入框
  _isLoading = false; // 正在请求数据
  _roadFeatures = []; // 选中的路
  _startEndFeatures = []; // 起始点和终点 feature
  _roadNode = []; // 选中路的节点，撤销使用
  _lineRingFeatures = []; // 环形路
  _toSelectFeatures = []; // 待选择的点

  componentDidMount = () => this._init();
  componentWillUnmount = () => this._reset();

  render() {
    const { enableStart, enableEnd, showContinueBtn } = this.state;
    return (
      <div
        className="new-route"
        ref={el => (this._newRoute = el)}
        onClick={e => {
          // console.log('click');
          // console.log(this._newRoute.getBoundingClientRect());
        }}
      >
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
          <div className="cancel-btn" onClick={this._cancelSelection}>
            {showContinueBtn ? '继续选择' : '撤销'}
          </div>
          <div className="save-btn" onClick={this._saveSecurityRoute}>
            保存
          </div>
        </div>
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
      this._removeSourceLayer(_val); // 删除所有 layer 和 source
    });
    this._newRoute = undefined; // 壳子
    this._input = undefined; // 输入框
    this._isLoading = false; // 正在请求数据
    this._roadFeatures = []; // 选中的路
    this._startEndFeatures = []; // 起始点和终点 feature
    this._roadNode = []; // 选中路的节点，撤销使用
    this._lineRingFeatures = []; // 环形路
    this._toSelectFeatures = []; // 待选择的点
    this.setState({
      enableStart: false,
      enableEnd: false,
      showContinueBtn: false
    }); // 重置
  };

  _setStartPoint = () => {
    const { enableStart } = this.state;
    if (!enableStart) this.setState({ enableStart: true, enableEnd: true });
    _MAP_.getZoom() < 15 && _MAP_.flyTo({ zoom: 15 });
  };

  _drawStartPoint = async e => {
    if (this._isLoading) return; // 保护
    const { enableStart } = this.state; // 点击设置起点后 enableStart 为 true
    if (!enableStart || _MAP_.getLayer(RouteLayers.routeStart)) return; // 如果有 routeStart 这个层级，说明设置了起点
    const _bound = _MAP_.getBounds(); // 获取屏幕边界
    const _coord = e.lngLat; // 获取点击的坐标点
    DrawStartPoint(_MAP_, _coord); // 绘制点击的起始点
    this._isLoading = true; // 正在加载
    const { res, err } = await FetchRoadInfo({
      coord: _coord,
      bound: _bound,
      order: 'first'
    });
    this._isLoading = false; // 加载完毕
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
  };

  // 选择下一个点
  _chooseRoutePoint = async e => {
    if (this._isLoading) return; // 保护
    const { properties } = e.features[0]; // 解构 properity
    this._isLoading = true; // 正在加载
    this._removeSourceLayer(RouteLayers.toSelect); // 删除待选择图层 ======> 解决重绘延时问题
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1]; // 前一个点击的节点
    const _suff = JSON.parse(properties.coordInfo); // 当前选中的点， coordInfo 中包含待选择的信息
    const _param = {
      prev: _prev,
      suff: _suff,
      ids: _roodIds,
      order: 'firstPlus'
    }; // 请求参数
    const { res, err } = await FetchRoadInfo(_param); // 获取道路 id
    this._isLoading = false; // 加载完毕
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
        const _feature = LineString(_coords); // 环形路 features
        this._lineRingFeatures.push(_feature);
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
    }
  };

  _chooseLineRing = e => {
    const { coordinates } = e.features[0].geometry;
    const _feature = LineString(coordinates, {
      index: this._roadFeatures.length
    }); // 生成 feature
    this._roadFeatures.push(_feature); // 添加 feature
    this._removeSourceLayer(RouteLayers.lineRingRoute); // 删除环形路
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
  };

  _selectEndPoint = async () => {
    if (this._isLoading) return; // 正在加载
    this._isLoading = true; // 正在加载
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1]; // 最后一个点
    const _param = { coord: _prev, ids: _roodIds, order: 'forLast' }; // 参数
    let { res, err } = await FetchRoadInfo(_param);
    this._isLoading = false; // 加载完毕
    const _features = [];
    if (err) return;
    for (let item of res) {
      const { coordinates } = item;
      const _roadCoords = coordinates.map(coord => [coord.x, coord.y]);
      _features.push(LineString(_roadCoords));
    }
    // 删除图层
    this._removeSourceLayer(RouteLayers.toSelect);
    DrawRoad(_MAP_, {
      id: RouteLayers.endRoute,
      features: _features,
      lineColor: '#099',
      lineWidth: 8
    });
  };

  _setEndPoint = async e => {
    if (this._isLoading) return;
    this._isLoading = true; // 正在加载
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1]; // 最后一个点
    const _param = { order: 'last', prev: _prev, suff: e.lngLat }; // 请求的参数
    const { res, err } = await FetchRoadInfo(_param); // 发送请求
    this._isLoading = false; // 加载完毕
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
      this._removeSourceLayer(RouteLayers.endRoute);
    }
  };

  _fetchRoadIds = async () => {
    const _bound = _MAP_.getBounds(); // 获取当前屏幕内的 roadIds
    const { res, err } = await FetchRoadInfo({
      bound: _bound,
      order: 'switchScreen'
    });
    return err ? undefined : res;
  };

  _cancelSelection = e => {
    e.stopPropagation();
    const { showContinueBtn } = this.state;
    if (!showContinueBtn) {
      // 可以撤销
      DrawNodePoint(_MAP_, this._roadNode); // 绘制节点
      this._removeSourceLayer(RouteLayers.toSelect); // 删除待选择的点
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
      this._removeSourceLayer(RouteLayers.routeNode); // 删除节点
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
    if (this._isLoading) return; // 保护
    const _prev = this._roadNode[this._roadNode.length - 2]; // 前一个点
    const _suff = this._roadNode[this._roadNode.length - 1]; // 当前选中的点
    const { x, y } = _suff.coordinates[0];
    const _duration = 500; // 动画时间
    _MAP_.flyTo({ center: [x, y], zoom: 15, duration: _duration }); // 动画
    await new Promise(resolve => {
      setTimeout(() => resolve(), _duration * 1.01);
    }); // 设置定时器
    this._isLoading = true; // 正在加载
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _param = {
      prev: _prev,
      suff: _suff,
      ids: _roodIds,
      order: 'firstPlus'
    };
    const { res, err } = await FetchRoadInfo(_param);
    this._isLoading = false; // 加载完毕
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
  };

  _saveSecurityRoute = async () => {
    const _inpVal = this._input.value;
    if (this._isLoading) return;
    if (!_inpVal) return TuyunMessage.warning('请输入方案名称');
    const _now = new Date().getTime();
    this._isLoading = true; // 正在加载
    const { res, err } = await SaveScurityRoute({
      fileName: _inpVal,
      fileId: '' + _now,
      content: {
        features: this._roadFeatures
      }
    });
    this._isLoading = false; // 加载完毕
    if (res && !err) TuyunMessage.show('保存成功');
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}
