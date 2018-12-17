import React, { Component } from 'react';

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;
    const _optItems = Content.map((iyem, index) => {
      <li />;
    });
  }
}
