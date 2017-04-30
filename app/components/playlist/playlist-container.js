import React from 'react';
import { connect } from 'react-redux';
import { getPlayLists } from '../../selectors/playlist-selector';
import * as actions from '../../actions/playlist-actions';

class PlaylistContainer extends React.Component {
  render() {
    const { playlist, current } = this.props;
    const { toggleSort, nextEpisode, prevEpisode } = this.props;
    console.log(current);

    const episodeElements = playlist
      .map((episode) => {
        if (current == episode.get('id')) {
          return <p key={episode.get('id')}>{episode.get('title')} - current</p>;
        } else {
          return <p key={episode.get('id')}>{episode.get('title')}</p>;
        }

      });

    return (
      <div className="playlist-container">
        <button onClick={() => toggleSort.bind(this)()} className="btn btn-primary">change sort</button>
        <button onClick={() => prevEpisode.bind(this)(current, playlist)} className="btn btn-primary">prev</button>
        <button onClick={() => nextEpisode.bind(this)(current, playlist)} className="btn btn-primary">next</button>
        {episodeElements}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlist: getPlayLists(state),
    current: state.playlist.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSort: () => dispatch(actions.toggleSort()),
    nextEpisode: (currentId, episodes) => dispatch(actions.nextEpisode(currentId, episodes)),
    prevEpisode: (currentId, episodes) => dispatch(actions.prevEpisode(currentId, episodes))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
