import React from 'react'
import { connect } from 'react-redux'
import { playPodcast, pausePodcast } from '../../actions/player-actions'
import { statusTypes } from '../../actions/types'

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
      duration: 1,
      progress: 0
    };
  }

  whileLoading(event) {

  }

  whilePlaying(event) {
    this.setState({
      position: event.position,
      duration: event.duration,
      progress: (event.position / event.duration) * 100
    });
  }

  render() {
    const { url, status, play, pause } = this.props;
    const playing = status === statusTypes.PLAYING;
    const label = playing ? 'pause' : 'play';  // TODO: use icon font
    const clickAction = playing ? pause : play;
    const mediaSelected = url !== '/';

    return (
      <div className='player'>
        <button onClick={clickAction} className='btn btn-primary' disabled={!mediaSelected}>
          {label}
        </button>
        <span className='tag tag-default'>{this.state.progress}</span>
        <Sound
          url={url}
          playStatus={statusMap[status]}
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
    play: () => { dispatch(playPodcast()) },
    pause: () => { dispatch(pausePodcast()) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
