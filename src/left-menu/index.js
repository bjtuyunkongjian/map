// import React, { Component } from 'react';
// // import Content from './Content';
// import Policedata from './podata';
// // import Camera from './camera';
// // import Case from './case';
// // import Call from './call';
// // import Police from './police';
// // import Car from './car';
// // import Facility from './facility';
// // import Palce from './palce';
// import { FiEdit, FiUsers, FiCamera, FiFileText } from 'react-icons/fi';
// import { MdDriveEta } from 'react-icons/md';
// import { FetchString } from './webapi';

// export default class LeftMenu extends Component {
//   state = {
//     selectedMenu: -1,
//     selectContent: -1,
//     selectPoData: -1,
//     selectCamera: -1,
//     selectCase: -1,
//     selectCall: -1,
//     selectPolice: -1,
//     selectCar: -1,
//     selectFacility: -1,
//     selectPalce: -1,
//     animate: ''
//   };

//   componentDidMount() {
//     _MAP_.on('mouseup', () => {
//       this.setState({ selectedMenu: -1 });
//     });
//     // this._init();
//   }

//   render() {
//     const { selectedMenu, animate } = this.state;
//     const optList = this._renderMenulist();
//     return (
//       <div className={`left-menu${animate}`}>
//         <div className="menu-box">
//           {menuList.map((item, index) => (
//             <div
//               className={`menu-item${
//                 index === selectedMenu ? 'selected-menu' : ''
//               }`}
//               key={`left_menu_${index}`}
//               onClick={e => this._selectIndex(e, index)}
//             >
//               <span className="icon">{item.icon}</span>
//               {item.name}
//               <span className="arrow arrow-right" />
//               {index === selectedMenu ? optList : null}
//             </div>
//           ))}
//         </div>
//         <button
//           className="control"
//           onClick={() =>
//             this.setState({
//               animate:
//                 animate === ' menu-slide-out'
//                   ? ' menu-slide-in'
//                   : ' menu-slide-out'
//             })
//           }
//         >
//           <span className="aspect-left" />
//         </button>
//       </div>
//     );
//   }

//   _init = async () => {
//     const _bounds = _MAP_.getBounds();
//     const _param = {
//       test: 400,
//       points: [
//         _bounds._sw.lng,
//         _bounds._ne.lat,
//         // _bounds._sw.lng,
//         // _bounds._sw.lat,
//         _bounds._ne.lng,
//         _bounds._sw.lat
//         // _bounds._ne.lng,
//         // _bounds._ne.lat
//       ]
//       // points: [
//       //   38.81869622602193,
//       //   121.52926123038611,
//       //   34.91336775296051,
//       //   115.11873876946055
//       // ]
//     };
//     const { res, err } = await FetchString(_param);
//     console.log(res, err);
//   };
//   _selectIndex = () => {};
//   _renderMenulist = () => {
//     let _menuList = null,
//       _seletedOpt;
//     const {
//       selectedMenu,
//       selectContent,
//       selectPoData,
//       selectCamera,
//       selectCase,
//       selectCall,
//       selectPolice,
//       selectCar,
//       selectFacility,
//       selectPalce
//     } = this.state;
//     switch (selectedMenu) {
//       case 0:
//         _menuList = Content;
//         _seletedOpt = selectContent;
//         break;
//       case 1:
//         _menuList = Policedata;
//         _seletedOpt = selectPoData;
//         break;
//       case 2:
//         _menuList = Camera;
//         _seletedOpt = selectCamera;
//         break;
//       case 3:
//         _menuList = Case;
//         _seletedOpt = selectCase;
//         break;
//       case 4:
//         _menuList = Call;
//         _seletedOpt = selectCall;
//         break;
//       case 5:
//         _menuList = Police;
//         _seletedOpt = selectPolice;
//         break;
//       case 6:
//         _menuList = Car;
//         _seletedOpt = selectCar;
//         break;
//       case 7:
//         _menuList = Facility;
//         _seletedOpt = selectFacility;
//         break;
//       case 8:
//         _menuList = Palce;
//         _seletedOpt = selectPalce;
//         break;
//     }
//     return _menuList ? (
//       <ul className="menu-option" onClick={e => e.stopPropagation()}>
//         <_menuList
//           selectedMenu={_seletedOpt}
//           onSelect={this._setSelectedMenu}
//         />
//       </ul>
//     ) : null;
//   };

//   _setSelectedMenu = val => {
//     const { selectedMenu } = this.state;
//     switch (selectedMenu) {
//       case 0:
//         this.setState({ selectContent: val });
//         break;
//       case 1:
//         this.setState({ selectPoData: val });
//         break;
//       case 2:
//         this.setState({ selectCamera: val });
//         break;
//       case 3:
//         this.setState({ selectCase: val });
//         break;
//       case 4:
//         this.setState({ selectCall: val });
//         break;
//       case 5:
//         this.setState({ selectPolice: val });
//         break;
//       case 6:
//         this.setState({ selectCar: val });
//         break;
//       case 7:
//         this.setState({ selectFacility: val });
//         break;
//       case 8:
//         this.setState({ selectPalce: val });
//         break;
//       default:
//     }
//   };
// }

// const menuList = [
//   { icon: <FiEdit />, type: 1, name: '工作内容' },
//   { icon: <FiUsers />, type: 1, name: '一标三实' },
//   { icon: <FiCamera />, type: 1, name: '摄像头' },
//   { icon: <FiFileText />, type: 1, name: '案件' },
//   { icon: <FiEdit />, type: 1, name: '报警' },
//   { icon: <FiEdit />, type: 1, name: '警力' },
//   { icon: <MdDriveEta />, type: 1, name: '车辆' },
//   { icon: <FiEdit />, type: 1, name: '公共设施' },
//   { icon: <FiEdit />, type: 1, name: '重要场所' }
// ];

import React, { Component } from 'react';
import Content from './menu-list/Content';
import PoliceData from './menu-list/podata';
import Camera from './menu-list/camera';
import Case from './menu-list/case';
import CallPolice from './menu-list/call-police';
import Police from './menu-list/police';
import PoliceCar from './menu-list/car';
import CommonFacility from './menu-list/facility';
import ImportantPalce from './menu-list/palce';
export default class LeftMenu extends Component {
  state = {
    animate: ''
  };

  render() {
    const { animate } = this.state;
    return (
      <div className={`left-menu ${animate}`}>
        <div className="menu-box">
          <Content />
          <PoliceData />
          <Camera />
          <Case />
          <CallPolice />
          <Police />
          <PoliceCar />
          <CommonFacility />
          <ImportantPalce />
        </div>
        <button
          className="control"
          onClick={() =>
            this.setState({
              animate:
                animate === 'menu-slide-out'
                  ? 'menu-slide-in'
                  : 'menu-slide-out'
            })
          }
        >
          <span className="aspect-left" />
        </button>
      </div>
    );
  }
}
