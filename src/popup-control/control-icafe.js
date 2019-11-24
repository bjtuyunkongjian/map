import React, { Component } from 'react';
import { GetIcafePop } from './webapi';

export default class ControlIcafe extends Component {
  state = {
    icafeName: '',
    listInfo: [],
    pageNum: '',
    total: ''
  };

  _pageSize = 10;

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
    const { icafeName, listInfo, pageNum, total } = this.state;
    return (
      <div>
        <div> {icafeName}</div>

        <ul className="table-header">
          <li>上网人员</li>
          <li>证件号码</li>
          <li>上网时间</li>
          <li>下网时间</li>
        </ul>

        {listInfo.map((item, index) => (
          <ul className="table-row" key={index}>
            <li>{item.swryxm}</li>
            <li>{item.zjhm}</li>
            <li>{item.swkssj}</li>
            <li>{item.xwsj}</li>
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
            className={`next-page ${pageNum === total ? 'hidden' : ''}`}
            onClick={() => this._nextPage()}
          >
            后一页
          </div>
        </div>
      </div>
    );
  }

  _fetchListInfo = async code => {
    // code yycsmc=临邑县翰林网吧&pageSize=10&pageNum=1
    const { pageNum } = this.state;
    const _param = `yycsmc=${code}&pageSize=${_pageSize}&pageNum=${pageNum}`;
    const { res, err } = await GetIcafePop(_param);
    if (!res || err) return;
    const { list, name, total } = res;
    this.setState({ listInfo: list, icafeName: name, total });
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
