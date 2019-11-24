import React, { Component } from 'react';
import { GetHotelPop } from './webapi';

export default class ControlHotel extends Component {
  state = {
    hotelName: '',
    listInfo: [],
    pageNum: '',
    totalPage: ''
  };

  _pagesize = 10;

  static defaultProps = {
    code: ''
  };

  componentWillReceiveProps(props, nextProps) {
    const { props: curCode } = props;
    const { code: nextCode } = nextProps;
    if (curCode === nextCode) return;
    // TODO 发请求
    this._fetchListInfo();
  }

  render() {
    const { hotelName, listInfo, pageNum, totalPage } = this.state;
    return (
      <div>
        <div> {hotelName}</div>

        <ul className="table-header">
          <li>旅客姓名</li>
          <li>证件号码</li>
          <li>地址</li>
          <li>入住时间</li>
          <li>退宿时间</li>
          <li>房间号</li>
        </ul>

        {listInfo.map((item, index) => (
          <ul className="table-row" key={index}>
            <li>{item.name}</li>
            <li>{item.idCode}</li>
            <li>{item.address}</li>
            <li>{item.inTime}</li>
            <li>{item.outTime}</li>
            <li>{item.noRoom}</li>
          </ul>
        ))}

        <div>
          <div
            className={`prev-page ${pageNum === 1 ? 'hidden' : ''}`}
            onClick={() => this._prePage()}
          >
            前一页
          </div>
          <div className="current-page">第{pageNum}页</div>
          <div
            className={`next-page ${pageNum === totalPage ? 'hidden' : ''}`}
            onClick={() => this._nextPage()}
          >
            后一页
          </div>
        </div>
      </div>
    );
  }

  _fetchListInfo = async code => {
    // code=3724120110&pageSize=10&pageNum=1
    const { pageNum } = this.state;
    const _param = `code=${code}&pageSize=${_pagesize}&pageNum=${pageNum}`;
    const { res, err } = await GetBayonetPop(_param);
    if (!res || err) return;
    const { list, name, totalPage } = res;
    this.setState({ listInfo: list, hotelName: name, totalPage });
  };

  _prePage = async () => {
    const { pageNum } = this.state;
    if (pageNum === 1) return;
    await this.setState({ pageNum: pageNum - 1 });
    this._fetchListInfo();
  };

  _nextPage = async () => {
    const { pageNum, totalPage } = this.state;
    if (pageNum === totalPage) return;
    await this.setState({ pageNum: pageNum + 1 });
    this._fetchListInfo();
  };
}
