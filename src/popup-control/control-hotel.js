import React, { Component } from 'react';
import { GetHotelPop } from './webapi';

export default class ControlHotel extends Component {
  state = {
    hotelName: '',
    listInfo: [],
    pageNum: 1,
    totalPage: ''
  };

  _pagesize = 10;

  static defaultProps = {
    code: ''
  };

  componentDidMount() {
    const { code } = this.props;
    this._fetchListInfo(code);
  }

  componentWillUpdate(nextProps) {
    const { code: curCode } = this.props;
    const { code: nextCode } = nextProps;
    if (curCode === nextCode) return;
    // TODO 发请求
    this._fetchListInfo(nextCode);
  }

  render() {
    const { hotelName, listInfo, pageNum } = this.state;
    return (
      <div className="table-box">
        <div className="table-title">宾馆名称： {hotelName}</div>

        <ul className="table-header">
          <li className="header-item">旅客姓名</li>
          <li className="header-item">证件号码</li>
          <li className="header-item">地址</li>
          <li className="header-item">入住时间</li>
          <li className="header-item">退宿时间</li>
          <li className="header-item">房间号</li>
        </ul>

        {listInfo.map((item, index) => (
          <ul className="table-row" key={index}>
            <li className="row-item basis-6">{item.name || '无'}</li>
            <li className="row-item basis-6">{item.idCode || '无'}</li>
            <li className="row-item basis-6">{item.address || '无'}</li>
            <li className="row-item basis-6">{item.inTime || '无'}</li>
            <li className="row-item basis-6">{item.outTime || '无'}</li>
            <li className="row-item basis-6">{item.noRoom || '无'}</li>
          </ul>
        ))}

        <div className="page">
          <div className="prev-page" onClick={() => this._prePage()}>
            前一页
          </div>
          <div className="current-page">第{pageNum}页</div>
          <div className="next-page" onClick={() => this._nextPage()}>
            后一页
          </div>
        </div>
      </div>
    );
  }

  _fetchListInfo = async code => {
    // code=3724120110&pageSize=10&pageNum=1
    const { pageNum } = this.state;
    const _param = `code=${code}&pageSize=${this._pagesize}&pageNum=${pageNum}`;
    const { res, err } = await GetHotelPop(_param);
    if (!res || err) return;
    const { list, yycsmc, totalPage } = res;
    this.setState({ listInfo: list, hotelName: yycsmc, totalPage });
  };

  _prePage = async () => {
    const { pageNum } = this.state;
    if (pageNum === 1) return;
    await this.setState({ pageNum: pageNum - 1 });
    const { code } = this.props;
    this._fetchListInfo(code);
  };

  _nextPage = async () => {
    const { pageNum, totalPage } = this.state;
    if (pageNum === totalPage) return;
    await this.setState({ pageNum: pageNum + 1 });
    const { code } = this.props;
    this._fetchListInfo(code);
  };
}
