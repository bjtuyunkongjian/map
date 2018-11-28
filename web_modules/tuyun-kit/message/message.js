import React, { Component } from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: props.duration
    };
    this.dismiss = this.dismiss.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentDidMount() {
    const { duration } = this.props;
    if (duration > 0) {
      this.timeout = setTimeout(this.dismiss, duration * 1000);
    }
  }

  dismiss() {
    this.props.onClose(this.props.id);
  }

  handleMouseOver() {
    clearTimeout(this.timeout);
    this.setState({ duration: 0 });
  }

  render() {
    const { content } = this.props;
    // const { duration } = this.state;
    delete this.props.duration;

    return <div className="alert alert-info alert-msg">{content}</div>;
  }
}
