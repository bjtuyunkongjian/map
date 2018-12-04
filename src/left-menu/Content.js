import React, { Component } from 'react';

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectContent: -1,
    onSelect: () => {}
  };

  render() {}
}
