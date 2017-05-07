import React from 'react';
import { connect } from 'react-redux';
import { getPlayList } from '../../selectors/playlist-selector';
import * as actions from '../../actions/playlist-actions';
import PlayList from './playlist';

class PlaylistContainer extends React.Component {
  render() {
    const { playlist, current } = this.props;
    const { toggleSort, playEpisode } = this.props;

    return (
      <div className="playlist-container">
        <button onClick={() => toggleSort.bind(this)()} className="btn btn-primary">change sort</button>
        <PlayList episodes={playlist} current={current} onPlayEpisode={playEpisode} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlist: getPlayList(state),
    current: state.playlist.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSort: () => dispatch(actions.toggleSort()),
    playEpisode: (episodeId) => dispatch(actions.playEpisode(episodeId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
