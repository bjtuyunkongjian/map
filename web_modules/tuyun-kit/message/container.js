import React, { Component, DOM } from 'react';
// import Message from './message';
import { IsEmpty } from 'tuyun-utils';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: {}
    };
  }

  addMessage(msg) {
    const { messages } = this.state;
    messages[msg.id] = msg;
    this.setState({ messages });
  }

  removeMessage(id) {
    const { messages } = this.state;
    delete messages[id];
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    console.log('messages', messages);
    if (IsEmpty(messages)) {
      return '';
    } else {
      return (
        <div className="ReactMessage__Container">
          {
            //   Object.keys(messages).map(key => (
            //   <Message
            //     key={key}
            //     {...messages[key]}
            //     onClose={this.removeMessage}
            //   />
            // ))
          }
        </div>
      );
    }
  }
}
