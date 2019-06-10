import React, { Component } from 'react';
import { Calendar } from 'tuyun-kit';

export default class DateSelector extends Component {
  state = {
    visible: false,
    pickedYear: '',
    pickedMonth: '',
    pickedDate: ''
  };

  static defaultProps = {
    visible: false,
    pickedYear: '',
    pickedMonth: '',
    pickedDate: '',
    maxDate: '',
    minDate: '',
    onCancel: () => {},
    onSubmit: () => {}
  };

  componentDidMount = () => {
    const { visible, pickedYear, pickedMonth, pickedDate } = this.props;
    this.setState({
      visible,
      pickedYear,
      pickedMonth,
      pickedDate
    });
  };

  componentWillReceiveProps(nextProps) {
    const { visible, pickedYear, pickedMonth, pickedDate } = nextProps;
    this.setState({
      visible,
      pickedYear,
      pickedMonth,
      pickedDate
    });
  }

  render() {
    const { visible, pickedYear, pickedMonth, pickedDate } = this.state;
    const { maxDate, minDate } = this.props;
    if (!visible) return null;
    return (
      <div className="DateSelector">
        <Calendar
          visible={visible}
          pickedYear={pickedYear}
          pickedMonth={pickedMonth}
          pickedDate={pickedDate}
          maxDate={maxDate}
          minDate={minDate}
          onSelect={this._onSelect}
        />

        <ul className="DateSelector_Footer">
          <li className="DateSelector_Cancel" onClick={this._onCancel}>
            取消
          </li>
          <li className="DateSelector_Submit" onClick={this._onSubmit}>
            确定
          </li>
        </ul>
      </div>
    );
  }

  _onSelect = ({ pickedYear, pickedMonth, pickedDate }) => {
    console.log({ pickedYear, pickedMonth, pickedDate });
    this.setState({ pickedYear, pickedMonth, pickedDate });
  };

  _onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ visible: false });
    onCancel();
  };

  _onSubmit = () => {
    const { onSubmit } = this.props;
    const { pickedYear, pickedMonth, pickedDate } = this.state;
    this.setState({ visible: false });
    onSubmit({ year: pickedYear, month: pickedMonth, date: pickedDate });
  };
}
