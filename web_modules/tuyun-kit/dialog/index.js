import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      // 从无到有
      this.node = document.createElement('div'); // 创建 DOM
      this.node.className = 'ReactModal'; // 给上 ClassName
      document.getElementsByTagName('body')[0].appendChild(this.node); // 给 body 加上刚才的 带有 className 的 div
      // 这个时候创建了 render的目的地。
      const style = require('./style.scss'); // css 样式
      const { children, ...rest } = nextProps;
      let modal = (
        <div className={style.container}>
          <div className={style.mask} {...rest} />
          {nextProps.children}
        </div>
      );
      // 这个时候创建了 Modal 的虚拟 Dom
      let allClass = document.getElementsByClassName('ReactModal');
      ReactDOM.render(modal, allClass[allClass.length - 1]); // 之所以这么写，是因为能重复打开Modal，因为每一次打开Modal，都会建立一个div
      // 将 Modal 成功 render 到目的地
    }
    if (this.props.open && !nextProps.open) {
      // 从有到无
      ReactDOM.unmountComponentAtNode(this.node); // 调用 react-dom unmountComponentAtNode方法，将Modal解除。
      // 或者可以写下面的方法，将整个创建的div删除，这样多次打开就不会有很多个div残留在body中，但是并不是很正规的做法。
      // document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('ReactModal')[0])
    }
  }
  render() {
    return null; // 只要这个Component的方法，不要它的render，它的render将会render到内层。
  }
}
