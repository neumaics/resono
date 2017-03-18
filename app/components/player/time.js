import React, { PropTypes } from 'react';
import moment from 'moment';

const propTypes = {
  length: PropTypes.number.isRequired,
  totalLength: PropTypes.number,
  fromEnd: PropTypes.bool
};

const defaultProps = {
  fromEnd: false
};

export default class Time extends React.Component {
  constructor(props) {
    super(props);

    this.formatTime = this.formatTime.bind(this);
  }

  pad(num) {
    return ("00" + num).substr(-2);
  }

  formatTime(millis) {
    // TODO: refactor... there's got to be a better way...
    const span = moment.duration(millis);
    const hours = span.hours();
    const minutes = span.subtract(hours, 'h').minutes();
    const seconds = span.subtract(minutes, 'm').subtract(hours, 'h').seconds();

    return [hours, this.pad(minutes), this.pad(seconds)].join(':');
  }

  render() {
    const { length, totalLength } = this.props;

    const start = length;
    const end = totalLength - length;

    return <h6 className="time-display">{this.formatTime(start)}-{this.formatTime(end)}</h6>;
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;
