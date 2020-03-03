import React, { Component } from 'react';
import { GetIcafePop } from './webapi';

export default class ControlIcafe extends Component {
  state = {
    icafeName: '',
    listInfo: [],
    pageNum: 1,
    totalPage: ''
  };

  _pageSize = 10;

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
    const { icafeName, listInfo, pageNum } = this.state;
    return (
      <div className="table-box">
        <div className="table-title">网吧名称:{icafeName}</div>

        <ul className="table-header">
          <li className="header-item">上网人员</li>
          <li className="header-item">证件号码</li>
          <li className="header-item">上网时间</li>
          <li className="header-item">下网时间</li>
        </ul>

        {listInfo.map((item, index) => (
          <ul className="table-row" key={index}>
            <li className="row-item basis-4">{item.swryxm || '无'}</li>
            <li className="row-item basis-4">{item.zjhm || '无'}</li>
            <li className="row-item basis-4">{item.swkssj || '无'}</li>
            <li className="row-item basis-4">{item.xwsj || '无'}</li>
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
    // code yycsmc=临邑县翰林网吧&pageSize=10&pageNum=1
    const { pageNum } = this.state;
    const _param = `yycsmc=${code}&pageSize=${this._pageSize}&pageNum=${pageNum}`;
    const { res, err } = await GetIcafePop(_param);
    if (!res || err) return;
    const { list, yycsmc, totalPage } = res;
    this.setState({ listInfo: list, icafeName: yycsmc, totalPage });
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
