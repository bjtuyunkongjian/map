import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo } from './webapi';
import {
  RouteLayers,
  CreatePointFeature,
  DrawRoad,
  DrawIconPoint
} from './security-route-layer';
import Turf from 'turf';

export default class ViewRoute extends Component {
  state = {
    routeList: [{ name: '111', date: '2019-01-11' }]
  };

  _roadCarIds = []; // {carId: '', roadId: ''}

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { routeList } = this.state;
    return (
      <div className="view-route">
        <div className="title">重大安保轨迹</div>
        <ul className="table-wrap">
          {routeList.map((item, index) => {
            return (
              <li
                className="table-row"
                key={`route_list_${index}`}
                onClick={() => this._fetchRouteInfo(item)}
              >
                <div className="table-name">{item.name}</div>
                <div className="table-date">{item.date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _init = async () => {
    var _line = Turf.lineString(lineCoords); // 道路 features
    console.log('_line', _line);
    const _lineLen = Turf.lineDistance(_line); // 道路总长度，单位 千米
    DrawRoad(_MAP_, {
      id: roadIdPrev,
      features: [_line],
      lineColor: '#800',
      lineWidth: 8
    });

    let _count = 0;
    const _interval = setInterval(() => {
      _count++;
      const _drivenDistance = _count * carSpeed; // 行驶过的道路总长度，单位 千米
      let _carPosition;
      if (_drivenDistance >= _lineLen) {
        _carPosition = Turf.along(_line, _lineLen);
        clearInterval(_interval);
      } else {
        _carPosition = Turf.along(_line, _drivenDistance);
      }
      DrawIconPoint(_MAP_, {
        id: carIdPrev,
        features: [_carPosition],
        iconImage: 'security-car'
      });
    }, 1);
  };

  _reset = () => {
    Object.keys(RouteLayers).map(key => {
      const _val = RouteLayers[key];
      _MAP_.getLayer(_val) && _MAP_.removeLayer(_val).removeSource(_val); // 删除所有 layer 和 source
    });
  };

  _fetchAllRoutes = async () => {
    const { res, err } = await FetchAllRoutes();
    if (!res || err) return console.log('获取重大安保轨迹失败');
    const _dateLen = ('' + new Date().getTime()).length;
    const _routeList = res.map(item => {
      const _name = item.substr(0, item.length - _dateLen - 1);
      const _timeStep = item.substr(-_dateLen);
      const _dateTime = parseInt(_timeStep);
      const _newDate = new Date(_dateTime);
      const _year = _newDate.getFullYear();
      const _month = _newDate.getMonth() + 1;
      const _date = _newDate.getDate();
      return {
        name: _name,
        date: `${_year}-${_month}-${_date}`,
        timeStep: _timeStep
      };
    });
    this.setState({ routeList: _routeList });
  };

  _fetchRouteInfo = async routeItem => {
    const _routeName = routeItem.name + '_' + routeItem.timeStep;
    const { res, err } = await FetchRouteInfo({ fileName: _routeName });
    if (!res || err) return console.log('获取重大安保轨迹详情失败');
    const { features } = res;
    _MAP_.flyTo({ center: features[0].geometry.coordinates[0], zoom: 15 }); // 以起点为中心点
    DrawRoad(_MAP_, {
      id: RouteLayers.selectedRoute,
      features: features,
      lineColor: '#888',
      lineWidth: 8
    });
  };

  _divideRoute = () => {
    let ind = 0;
    const _interval = setInterval(() => {
      if (ind >= res.length) return;

      const _feature = CreatePointFeature({
        coordinates: [res[ind].x, res[ind].y]
      });
      ind++;
      DrawIconPoint(_MAP_, {
        id: RouteLayers.securityCar,
        features: [_feature],
        iconImage: 'security-car'
      });
    }, 10);
  };
}

const carSpeed = 16.6 / 1000; // 汽车运行速度， 多少 units 每秒
const carIdPrev = 'MENU_LIST_VIEW_ROUTE_CAR_'; // 汽车 id
const roadIdPrev = 'MENU_LIST_VIEW_ROUTE_ROAD_'; // 道路 id

const lineCoords = [
  [117.02548742294312, 36.62030690078126],
  [117.02577710151672, 36.62064273019513],
  [117.02658176422119, 36.621521046360954],
  [117.0269787311554, 36.62207214159095],
  [117.02719330787659, 36.6224596280656],
  [117.02738642692566, 36.622907387788246],
  [117.02746152877808, 36.62318293094022],
  [117.02764391899109, 36.62404399694175],
  [117.02775120735168, 36.624655347963795],
  [117.02780485153198, 36.62499976893943],
  [117.02789068222046, 36.62535279884224],
  [117.02800869941711, 36.62564555412058],
  [117.02836275100708, 36.626411878849],
  [117.02848076820374, 36.626756291975596],
  [117.02852368354797, 36.62695432882646],
  [117.02853441238403, 36.62716097543269],
  [117.02850222587585, 36.62786701382353],
  [117.02851295471191, 36.62809948846359],
  [117.02853441238403, 36.62837501305488],
  [117.02862024307251, 36.628779688012514],
  [117.02874898910522, 36.62933073134657],
  [117.02885627746582, 36.62957181156628],
  [117.02895283699036, 36.62972679130925],
  [117.0292854309082, 36.63013145916884],
  [117.02970385551453, 36.630518905128255],
  [117.03027248382568, 36.63113020479187],
  [117.03056216239929, 36.63141432833693],
  [117.03083038330078, 36.6316640117996],
  [117.03115224838257, 36.63192230418555],
  [117.03152775764465, 36.63220642481011],
  [117.03215003013611, 36.632611079648726],
  [117.03282594680786, 36.633084609208396],
  [117.03346967697144, 36.63352369765444],
  [117.03409194946289, 36.63396278359838],
  [117.0342206954956, 36.63404026909346],
  [117.03165650367737, 36.63228391207136],
  [117.03215003013611, 36.632611079648726],
  [117.03282594680786, 36.633084609208396],
  [117.03346967697144, 36.63352369765444],
  [117.03409194946289, 36.63396278359838],
  [117.03506827354431, 36.63461710310763],
  [117.03552961349487, 36.634901213796],
  [117.03581929206848, 36.63505618282083],
  [117.03610897064209, 36.63520254216921],
  [117.03643083572388, 36.63534890123954],
  [117.03685998916626, 36.63550386936396],
  [117.03731060028076, 36.63564161854622],
  [117.0377504825592, 36.63573632096616],
  [117.03823328018188, 36.635831023269716],
  [117.03863024711609, 36.635899897599174],
  [117.03933835029602, 36.63602903680096],
  [117.03973531723022, 36.636097910953424],
  [117.04188108444214, 36.636580028296734],
  [117.04248189926147, 36.63674360313851],
  [117.04307198524475, 36.636881350104304],
  [117.04350113868713, 36.63697605100046],
  [117.04399466514587, 36.637070751780186],
  [117.04442381858826, 36.63712240670188],
  [117.04482078552246, 36.63721710730171],
  [117.04527139663696, 36.63721710730171],
  [117.04552888870239, 36.637199889019485],
  [117.04586148262024, 36.63716545244351],
  [117.04634428024292, 36.63708797009126],
  [117.0468270778656, 36.63698466016707],
  [117.04709529876709, 36.63690717763298],
  [117.04736351966858, 36.63682108583707],
  [117.04740643501282, 36.63679525827955],
  [117.04803943634033, 36.63654559144369],
  [117.04908013343811, 36.63608930168773],
  [117.05034613609314, 36.635228370260634],
  [117.05049633979797, 36.63515088596034],
  [117.05059289932251, 36.63512505784291],
  [117.05072164535522, 36.63504757343874],
  [117.05087184906006, 36.63486677619258],
  [117.05102205276489, 36.634746244459464],
  [117.05109715461731, 36.63466015024896],
  [117.05116152763367, 36.63462571253781],
  [117.05130100250244, 36.634634321967056],
  [117.05135464668274, 36.63461710310763],
  [117.05156922340393, 36.63466015024896],
  [117.0517086982727, 36.634642931395305],
  [117.05185890197754, 36.63450518042761],
  [117.05200910568237, 36.634556837069354],
  [117.05220222473145, 36.63466875967434],
  [117.05225586891174, 36.63466875967434],
  [117.0524275302887, 36.634384648128844],
  [117.05256700515747, 36.63435881975458],
  [117.05315709114075, 36.63435881975458],
  [117.0543909072876, 36.63446213319969],
  [117.05636501312256, 36.63472902562508],
  [117.05770611763, 36.634935651384],
  [117.05816745758057, 36.63509922971686],
  [117.05891847610474, 36.63547804136486],
  [117.0599913597107, 36.63619261281252],
  [117.06126809120178, 36.63677803990305],
  [117.06165432929993, 36.636898568457724],
  [117.06218004226685, 36.6370793609362],
  [117.06248044967651, 36.63715684329712],
  [117.06264138221741, 36.63713962500141],
  [117.06272721290588, 36.63711379755067]
];
