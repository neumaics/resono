import React from 'react'
import { connect } from 'react-redux'
import { playPodcast, pausePodcast } from '../../actions/player-actions'
import { statusTypes } from '../../actions/types'
import ProgressBar from './progress-bar'

import Sound from 'react-sound'
const statusMap = {
  PLAYING: Sound.status.PLAYING,
  PAUSED: Sound.status.PAUSED,
  STOPPED: Sound.status.STOPPED
}

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      duration: 1
    };
  }

  whileLoading(event) { }

  whilePlaying(event) {
    this.setState({
      position: event.position,
      duration: event.duration
    });
  }

  onChangePosition(newPosition) {
    this.setState({
      position: newPosition
    });
  }

  render() {
    const { url, status, play, pause } = this.props;
    const playing = status === statusTypes.PLAYING;
    const icon = playing ? 'fa-pause' : 'fa-play';
    const clickAction = playing ? pause : play;
    const mediaSelected = url !== '/';
    const buttonClass = mediaSelected ? 'btn-outline-primary' : 'btn-outline-secondary';

    return (
      <div className='player'>
        <button onClick={clickAction} className={`btn ${buttonClass}`} disabled={!mediaSelected}>
          <i className={`fa ${icon}`} aria-hidden="true"></i>
        </button>
        <div style={{width: "70%"}}>
          <ProgressBar
            duration={this.state.duration}
            position={this.state.position}
            onPositionChange={this.onChangePosition.bind(this)} />
        </div>
        <Sound
          url={url}
          playStatus={statusMap[status]}
          position={this.state.position}
          onLoading={this.whileLoading.bind(this)}
          onPlaying={this.whilePlaying.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.player.currentPodcast,
    status: state.player.status
  };
}

const mapDispatchToProps = (dispatch, params) => {
  return {
    play: () => { dispatch(playPodcast()); },
    pause: () => { dispatch(pausePodcast()); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
