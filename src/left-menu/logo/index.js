import React, { Component } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

export default class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <FaMapMarkedAlt />
        <div className="logo-text">山东省公安厅</div>
      </div>
    );
  }
}
