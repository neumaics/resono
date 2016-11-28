import React, { PropTypes } from 'react';
import PodcastItem from './search-item';

const propTypes = {
  podcasts: PropTypes.array,
  onSubscribeClick: PropTypes.func
};

export default class SearchList extends React.Component {
  render() {
    const { podcasts, onSubscribeClick } = this.props;

    const podcastItems = podcasts.map((item, index) => {
      return <PodcastItem title={item.title} key={index} podcastId={item.id} item={item.item} onSubscribeClick={onSubscribeClick}/>;
    });

    return (
      <div>
        {podcastItems}
      </div>
    );
  }
}

SearchList.propTypes = propTypes;
