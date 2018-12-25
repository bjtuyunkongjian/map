import React, { Component } from 'react';
import Init from './create-snow';
export default class Christmas extends Component {
  static defaultProps = {
    onClick: () => {}
  };

  state = {
    visible: true
  };

  render() {
    const { onClick } = this.props;
    const { visible } = this.state;
    if (!visible) return null;
    return (
      <div
        style={style}
        onClick={() => {
          this.setState({ visible: false });
          onClick();
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1
          }}
          ref={el => Init(el)}
        />
        <img
          src="./merry-christmas.png"
          style={{ width: 500, position: 'absolute', top: 30, left: 50 }}
        />
        <img
          src="./christmas-tree.png"
          style={{ width: 100, position: 'absolute', bottom: 30, right: 50 }}
        />
        <img
          src="./christmas-tree.png"
          style={{ width: 100, position: 'absolute', bottom: 30, right: 240 }}
        />
        <img
          src="./christmas-tree.png"
          style={{ width: 160, position: 'absolute', bottom: 30, right: 120 }}
        />
      </div>
    );
  }
}

const style = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9999,
  backgroundColor: 'rgba(0, 0, 0, 0.65)'
};
