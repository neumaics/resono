import React, { PropTypes } from 'react';
import EpisodeItem from './episode-item';

const propTypes = {
  episodes: PropTypes.object,
  onClick: PropTypes.func,
  sortBy: PropTypes.string,
  order: PropTypes.oneOf(['desc', 'asc'])
};

export default class EpisodeList extends React.Component {
  render() {
    const { episodes, onClick, sortBy, order } = this.props;
    const ascending = order === 'desc' ? -1 : 1;

    const sortedEpisodes = episodes
      .filter((e) => { return !e.get('removed'); })
      .sortBy((e) => ascending * e.get(sortBy));

    const episodeItems = sortedEpisodes.map((episode) => {
      const id = episode.get('id');
      const podcast = episode.get('podcast');

      return <EpisodeItem key={id} podcastName={podcast} episode={episode} onClick={onClick} />;
    }).toJS();

    return (
      <ul className="episode-list">
        {episodeItems}
      </ul>
    );
  }
}

EpisodeList.propTypes = propTypes;
