import React, { Component } from 'react';
import { GetBayonetPop } from './webapi';

export default class ControlBayonet extends Component {
  state = {
    bayonetName: '',
    listInfo: [],
    pageNum: '',
    totalPage: ''
  };

  _pagesize = 20;

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
    const { bayonetName, listInfo, pageNum, totalPage } = this.state;
    return (
      <div>
        <div> {bayonetName}</div>

        <ul className="table-header">
          <li>车牌号</li>
          <li>开始采集</li>
          <li>结束采集</li>
        </ul>

        {listInfo.map((item, index) => (
          <ul className="table-row" key={index}>
            <li>{item.plateNumber}</li>
            <li>{item.captureTime}</li>
            <li>{item.captureTime2}</li>
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
    // code
    const { pageNum } = this.state;
    const _param = `timeStart=1572007200&timeEnd=1572307200&pn=${pageNum}&length=${this._pagesize}&kkId=${code}`;
    const { res, err } = await GetBayonetPop(_param);
    if (!res || err) return;
    const { list, name, totalPage } = res;
    this.setState({ listInfo: list, bayonetName: name, totalPage });
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
