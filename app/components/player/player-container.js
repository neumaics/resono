import React from 'react';
import { connect } from 'react-redux';
import { playPodcast, pausePodcast } from '../../actions/player-actions';
import { statusTypes } from '../../actions/types';
import ProgressBar from './progress-bar';
import Sound from 'react-sound';

const statusMap = {
  PLAYING: Sound.status.PLAYING,
  PAUSED: Sound.status.PAUSED,
  STOPPED: Sound.status.STOPPED
};

const skipForwardDuration = 10000;
const skipBackwardDuration = 10000;

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      duration: 1,
      bytesLoaded: 0,
      bytesTotal: 1
    };

    this.skipBack = this.skipBack.bind(this);
    this.skipForward = this.skipForward.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.whileLoading = this.whileLoading.bind(this);
    this.whilePlaying = this.whilePlaying.bind(this);
  }

  whileLoading(event) {
    this.setState({
      bytesLoaded: event.bytesLoaded,
      bytesTotal: event.bytesTotal
    });
  }

  whilePlaying(event) {
    this.setState({
      position: event.position,
      duration: event.duration
    });
  }

  onChangePosition(newPosition) {
    this.setState({ position: newPosition });
  }

  skipBack() {
    const newPosition = this.state.position - skipBackwardDuration;

    if (newPosition >= 0.0) {
      this.setState({ position: newPosition });
    }
  }

  skipForward() {
    const newPosition = this.state.position + skipForwardDuration;

    if (newPosition < this.state.duration) {
      this.setState({ position: newPosition });
    }
  }

  render() {
    const { url, status, play, pause } = this.props;
    const playing = status === statusTypes.PLAYING;
    const icon = playing ? 'fa-pause' : 'fa-play';
    const clickAction = playing ? pause : play;
    const mediaSelected = url !== '/';
    const buttonClass = mediaSelected ? 'btn-outline-primary' : 'btn-outline-secondary';

    return (
      <div className="player">
        <button onClick={clickAction} className={`btn ${buttonClass}`} disabled={!mediaSelected}>
          <i className={`fa ${icon}`} aria-hidden="true"></i>
        </button>
        <button onClick={this.skipBack} className="btn btn-outline-info">
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </button>
        <div style={{width: '60%'}}>
          <ProgressBar
            duration={this.state.duration}
            position={this.state.position}
            bytesLoaded={this.state.bytesLoaded}
            bytesTotal={this.state.bytesTotal}
            onPositionChange={this.onChangePosition} />
        </div>
        <button onClick={this.skipForward} className="btn btn-outline-info">
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </button>
        <Sound
          url={url}
          playStatus={statusMap[status]}
          position={this.state.position}
          onLoading={this.whileLoading}
          onPlaying={this.whilePlaying} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.player.currentPodcast,
    status: state.player.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: () => { dispatch(playPodcast()); },
    pause: () => { dispatch(pausePodcast()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
