import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/player-actions';
import { statusTypes } from '../../actions/types';
import ProgressBar from './progress-bar';
import Time from './time';
import Volume from './volume';
import Sound from 'react-sound';

const statusMap = {
  PLAYING: Sound.status.PLAYING,
  PAUSED: Sound.status.PAUSED,
  STOPPED: Sound.status.STOPPED
};

const defaultSkipForwardDuration = 10000;
const defaultSkipBackwardDuration = 10000;

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);

    const { skipForwardDuration, skipBackwardDuration } = this.props.config;

    this.skipBack = this.skipBack(skipBackwardDuration || defaultSkipBackwardDuration).bind(this);
    this.skipForward = this.skipForward(skipForwardDuration || defaultSkipForwardDuration).bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.whileLoading = this.whileLoading.bind(this);
    this.whilePlaying = this.whilePlaying.bind(this);
    this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
  }

  componentDidMount () {
    // This is defined and attached by the <Sound ... /> element, therefore...
    // eslint-disable-next-line no-undef
    soundManager.setup({ debugMode: false });
  }

  whileLoading(event) {
    this.props.changeBytesTotal(event.bytesTotal);
    this.props.changeBytesLoaded(event.bytesLoaded);
  }

  whilePlaying(event) {
    this.props.changePosition(event.position);
    this.props.changeLength(event.duration);
  }

  onFinishedPlaying() {
    this.props.pause();
  }

  onChangePosition(newPosition) {
    if (this.props.url !== '/') {
      this.props.changePosition(newPosition);
    }
  }

  skipBack(skipBackwardDuration) {
    return () => {
      const newPosition = this.props.position - skipBackwardDuration;

      if (newPosition >= 0.0) {
        this.props.changePosition(newPosition);
      } else {
        this.props.changePosition(0.0);
      }
    };
  }

  skipForward(skipForwardDuration) {
    return () => {
      const newPosition = this.props.position + skipForwardDuration;

      if (newPosition < this.props.length) {
        this.props.changePosition(newPosition);
      } else {
        this.props.changePosition(this.props.length);
      }
    };
  }

  render() {
    const { url, status, play, pause } = this.props;
    const { bytesLoaded, bytesTotal, length, position } = this.props;
    const { changeVolume } = this.props;
    const volume = parseFloat(this.props.volume);

    const playing = status === statusTypes.PLAYING;
    const icon = playing ? 'fa-pause' : 'fa-play';
    const clickAction = playing ? pause : play;
    const mediaSelected = url !== '/';
    const buttonClass = mediaSelected ? 'btn-outline-primary' : 'btn-outline-secondary';

    return (
      <div className="player">
        <button onClick={clickAction} className={`btn borderless ${buttonClass}`} disabled={!mediaSelected}>
          <i className={`fa ${icon}`} aria-hidden="true"></i>
        </button>

        <Volume volume={volume} onVolumeChange={changeVolume} />
        <button onClick={this.skipBack} className="btn btn-outline-info borderless">
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </button>
        <div style={{width: '60%'}}>
          <ProgressBar
            duration={length}
            position={position}
            bytesLoaded={bytesLoaded}
            bytesTotal={bytesTotal}
            onPositionChange={this.onChangePosition} />
        </div>
        <button onClick={this.skipForward} className="btn btn-outline-info borderless">
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </button>
        <Time length={position} totalLength={length} fromEnd={true} />
        <Sound
          url={url}
          playStatus={statusMap[status]}
          position={position}
          onLoading={this.whileLoading}
          onPlaying={this.whilePlaying}
          onFinishedPlaying={this.onFinishedPlaying}
          volume={volume} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.player.currentPodcast,
    status: state.player.status,
    config: state.config.get('player').toJS(),
    position: state.player.position,
    length: state.player.length,
    bytesTotal: state.player.bytesTotal,
    bytesLoaded: state.player.bytesLoaded,
    volume: state.player.volume
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: () => { dispatch(actions.playPodcast()); },
    pause: () => { dispatch(actions.pausePodcast()); },
    changePosition: (position) => { dispatch(actions.changePosition(position)); },
    changeLength: (length) => { dispatch(actions.changeLength(length)); },
    changeBytesTotal: (bytesTotal) => { dispatch(actions.changeBytesTotal(bytesTotal)); },
    changeBytesLoaded: (bytesLoaded) => { dispatch(actions.changeBytesLoaded(bytesLoaded)); },
    changeVolume: (newVolume) => { dispatch(actions.changeVolume(newVolume)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
