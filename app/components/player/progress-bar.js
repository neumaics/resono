import React, { PropTypes } from 'react';

const propTypes = {
  duration: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  onPositionChange: PropTypes.func.isRequired
};

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.onParentClick = this.onParentClick.bind(this);
    this.onRibbonClick = this.onRibbonClick.bind(this);
  }

  calculateNewPostion(clientClick, duration, target) {
    const clickPosition = clientClick - target.offsetLeft;
    const width = target.offsetWidth;
    const newPosition = (clickPosition / width) * duration;

    return newPosition;
  }

  onParentClick(event, callback) {
    event.stopPropagation();
    callback(this.calculateNewPostion(event.clientX, this.props.duration, event.target));
  }

  onRibbonClick(event, callback) {
    event.stopPropagation();
    callback(this.calculateNewPostion(event.clientX, this.props.duration, event.target.parentNode));
  }

  render() {
    const { duration, position, onPositionChange } = this.props;
    const playProgress = ((position / duration) * 100).toFixed(0);

    return (
      <div className="progress-bar-container" onClick={(e) => this.onParentClick(e, onPositionChange)}>
        <div className="progress-bar-ribbon" style={{width: `${playProgress}%`}} onClick={(e) => this.onRibbonClick(e, onPositionChange)}>
          <div className="progress-bar-handle"
            onClick={(e) => e.stopPropagation()}></div>
        </div>
        <div className="progress-bar-ribbon" onClick={(e) => this.onRibbonClick(e, onPositionChange)}></div>
      </div>

    );
  }
}

ProgressBar.propTypes = propTypes;
