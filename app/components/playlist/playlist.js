import React, { PropTypes } from 'react';
import Episode from './episode';

const propTypes = {
  episodes: PropTypes.object,
  current: PropTypes.string,
  onPlayEpisode: PropTypes.func
};

export default class PlayList extends React.Component {
  render()  {
    const { episodes, current, onPlayEpisode } = this.props;

    return (
      <div className="playlist">
        {episodes.map((ep) => {
          const id = ep.get('id');
          const play = (id) => () => onPlayEpisode(id);

          return <Episode play={play(id)} key={id} episodeId={id} title={ep.get('title')} isCurrent={current == ep.get('id')} />;
        })}
      </div>
    );
  }
}

PlayList.propTypes = propTypes;
