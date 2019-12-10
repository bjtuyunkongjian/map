import React, { Component } from 'react';
import { GetBayonetPop } from './webapi';

export default class ControlBayonet extends Component {
  state = {
    name: '',
    listInfo: [],
    pageNum: 1,
    totalPage: ''
  };

  _pagesize = 10;

  static defaultProps = {
    code: '',
    name: ''
  };
  componentDidMount() {
    const { code } = this.props;
    this._fetchListInfo(code);
  }

  componentWillUpdate(nextProps) {
    const { props: curCode } = this.props;
    const { code: nextCode } = nextProps;
    if (curCode === nextCode) return;
    // TODO 发请求
    this._fetchListInfo(nextCode);
  }

  render() {
    const { name } = this.props;
    const { listInfo, pageNum } = this.state;
    return (
      <div className="table-box">
        <div className="table-title">卡口名称: {name}</div>

        <ul className="table-header">
          <li className="header-item">车牌号</li>
          <li className="header-item">开始采集</li>
          <li className="header-item">结束采集</li>
        </ul>

        {listInfo.map((item, index) => (
          <ul className="table-row" key={index}>
            <li className="row-item basis-3">{item.plateNumber || '无'}</li>
            <li className="row-item basis-3">{item.captureTime || '无'}</li>
            <li className="row-item basis-3">{item.captureTime2 || '无'}</li>
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
    // code
    const { pageNum } = this.state;
    const _param = `pn=${pageNum}&length=${this._pagesize}&kkId=${code}`;
    const { res, err } = await GetBayonetPop(_param);
    if (!res || err) return;
    const { data = [], totalPage } = res;
    this.setState({ listInfo: data, bayonetName: name, totalPage });
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
