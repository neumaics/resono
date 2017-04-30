import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/player-actions';
import { statusTypes } from '../../actions/types';
import ProgressBar from './progress-bar';
import Time from './time';
import Volume from './volume';
import Sound from 'react-sound';
import electron from 'electron';
import { getPlayList } from '../../selectors/playlist-selector';
import * as playListActions from '../../actions/playlist-actions';

const statusMap = {
  PLAYING: Sound.status.PLAYING,
  PAUSED: Sound.status.PAUSED,
  STOPPED: Sound.status.STOPPED
};

const defaultSkipForwardDuration = 100000;
const defaultSkipBackwardDuration = 100000;

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);

    electron.ipcRenderer.on('MediaPlayPause', this.togglePlaying.bind(this));

    const { skipForwardDuration, skipBackwardDuration } = this.props.config;
    const { nextEpisode, prevEpisode } = this.props;

    this.skipBack = this.skipBack(skipBackwardDuration || defaultSkipBackwardDuration).bind(this);
    this.skipForward = this.skipForward(skipForwardDuration || defaultSkipForwardDuration).bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.whileLoading = this.whileLoading.bind(this);
    this.whilePlaying = this.whilePlaying.bind(this);
    this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
    this.nextEpisode = nextEpisode.bind(this);
    this.prevEpisode = prevEpisode.bind(this);
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

  onFinishedPlaying(current, episodes) {
    this.nextEpisode(current, episodes);
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

  togglePlaying() {
    const playing = this.props.status === statusTypes.PLAYING;

    if (playing) {
      this.props.pause();
    } else {
      this.props.play();
    }
  }

  render() {
    const { status, play, pause, /*config*/ } = this.props;
    const { bytesLoaded, bytesTotal, length, position } = this.props;
    const { playlist, current } = this.props;
    const { changeVolume } = this.props;

    const volume = parseFloat(this.props.volume);
    const episode = playlist.find((ep) => ep.get('id') == current);

    const url = episode ? episode.get('url') : '/';
    const playing = status === statusTypes.PLAYING;
    const icon = playing ? 'fa-pause' : 'fa-play';
    const clickAction = playing ? pause : play;
    const mediaSelected = url !== '/';
    const buttonClass = mediaSelected ? 'btn-outline-primary' : 'btn-outline-secondary';

    return (
      <div className="player">
        <button onClick={() => this.prevEpisode(current, playlist)} className={`btn borderless ${buttonClass}`} disabled={!mediaSelected}>
          <i className={`fa fa-backward`} aria-hidden="true"></i>
        </button>
        <button onClick={clickAction} className={`btn borderless ${buttonClass}`} disabled={!mediaSelected}>
          <i className={`fa ${icon}`} aria-hidden="true"></i>
        </button>
        <button onClick={() => this.nextEpisode(current, playlist)} className={`btn borderless ${buttonClass}`} disabled={!mediaSelected}>
          <i className={`fa fa-forward`} aria-hidden="true"></i>
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
          onFinishedPlaying={() => this.onFinishedPlaying(current, playlist)}
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
    volume: state.player.volume,
    playlist: getPlayList(state),
    current: state.playlist.current
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
    changeVolume: (newVolume) => { dispatch(actions.changeVolume(newVolume)); },
    nextEpisode: (current, episodes) => dispatch(playListActions.nextEpisode(current, episodes)),
    prevEpisode: (current, episodes) => dispatch(playListActions.prevEpisode(current, episodes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
