import React, { PropTypes } from 'react';

const propTypes = {
  onVolumeChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired
};

export default class Volume extends React.Component {
  constructor(props) {
    super(props);
    const { onVolumeChange } = this.props;

    this.onParentClick = this.onParentClick(onVolumeChange).bind(this);
    this.onRibbonClick = this.onRibbonClick(onVolumeChange).bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onParentClick(onVolumeChange) {
    return (event) => {
      event.stopPropagation();
      onVolumeChange(this.calculateNewPostion(event.clientX, event.target));
    };

  }

  onRibbonClick(onVolumeChange) {
    return (event) => {
      event.stopPropagation();
      onVolumeChange(this.calculateNewPostion(event.clientX, event.target.parentNode));
    };
  }

  calculateNewPostion(clientClick, target) {
    const clickPosition = clientClick - target.offsetLeft;
    const width = target.offsetWidth;
    const newPosition = (clickPosition / width) * 100;

    return newPosition.toFixed(2);
  }

  onHandleClick(event) {
    event.stopPropagation();
  }

  render() {
    const { volume } = this.props;

    return (
      <div className="volume-container" onMouseUp={this.onParentClick}>
        <div className="volume-ribbon" style={{ width: `${volume}%`}} onMouseUp={this.onRibbonClick}>
          <div className="volume-handle" onMouseUp={this.onHandleClick}></div>
        </div>
      </div>
    );
  }
}

Volume.propTypes = propTypes;
