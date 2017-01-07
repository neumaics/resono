import React, { PropTypes } from 'react';

const propTypes = {
  duration: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  bytesLoaded: PropTypes.number.isRequired,
  bytesTotal: PropTypes.number.isRequired,
  onPositionChange: PropTypes.func.isRequired
};

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    const { onPositionChange } = this.props;

    this.onParentClick = this.onParentClick(onPositionChange).bind(this);
    this.onRibbonClick = this.onRibbonClick(onPositionChange).bind(this);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.state = { dragging: false };
  }

  calculateNewPostion(clientClick, duration, target) {
    const clickPosition = clientClick - target.offsetLeft;
    const width = target.offsetWidth;
    const newPosition = (clickPosition / width) * duration;

    return newPosition;
  }

  onParentClick(onPositionChange) {
    return (event) => {
      event.stopPropagation();
      onPositionChange(this.calculateNewPostion(event.clientX, this.props.duration, event.target));
    }
  }

  onRibbonClick(onPositionChange) {
    return (event) => {
      event.stopPropagation();
      onPositionChange(this.calculateNewPostion(event.clientX, this.props.duration, event.target.parentNode));
    }
  }

  onMouseDown(event) {
    if (event.button !== 0) return;

    this.setState({ dragging: true });
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseUp(event) {
    this.setState({ dragging: false });
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseMove(event) {
    if (!this.state.dragging) return;

    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { duration, position, bytesLoaded, bytesTotal } = this.props;
    const playProgress = ((position / duration) * 100).toFixed(2);
    const loadProgress = bytesTotal > 0 ? ((bytesLoaded / bytesTotal) * 100).toFixed(2) : 0;

    return (
      <div className="progress-bar-container"
        onMouseUp={this.onParentClick}>

        <div className="progress-bar-ribbon load-progress"
          style={{width: `${loadProgress}%`}}
          onClick={this.onRibbonClick}>
        </div>

        <div className="progress-bar-ribbon play-progress"
          style={{width: `${playProgress}%`}}
          onMouseUp={this.onRibbonClick}>

          <div className="progress-bar-handle"
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}>
          </div>
        </div>
      </div>

    );
  }
}

ProgressBar.propTypes = propTypes;
