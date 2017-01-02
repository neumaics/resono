import React, { PropTypes } from 'react';
import moment from 'moment';

const propTypes = {
  podcastName: PropTypes.string,
  episode: PropTypes.object,
  onClick: PropTypes.func
};

export default class EpisodeItem extends React.Component {
  render() {
    const { podcastName, episode, onClick } = this.props;
    const url = episode.get('url');
    const title = episode.get('title');
    const displayDate = moment(episode.get('pubDate')).fromNow();
    const status = episode.get('listened') ? 'status-default' : 'status-new';

    return (
      <li className={`episode-item status-tag ${status}`} onClick={() => onClick(url)}>
        <p>{`${title}`}</p>
        <p><small>{`${podcastName} published ${displayDate}`}</small></p>
      </li>
    );
  }
}

EpisodeItem.propTypes = propTypes;
