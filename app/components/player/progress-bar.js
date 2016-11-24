import React, { PropTypes } from 'react';

const propTypes = {
  duration: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  onPositionChange: PropTypes.func.isRequired
};

export default class ProgressBar extends React.Component {
  render() {
    const { duration, position, onPositionChange } = this.props;
    const progress = ((position / duration) * 100).toFixed(0);

    return (
      <div class="progress-bar-container">
        <div>

        </div>
        {// <div className="progress-bar">
        //   <input
        //     type="range"
        //     name="range"
        //     min="1"
        //     max={duration}
        //     value={position}
        //     step="1"
        //     onChange={(e) => onPositionChange(e.target.value)} />
        //   <output id="range">{progress}%</output>
        // </div>
        }
      </div>

    );
  }
}

ProgressBar.propTypes = propTypes;
