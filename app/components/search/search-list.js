import React, { PropTypes } from 'react';
import PodcastItem from './search-item';
import _ from 'lodash';

const propTypes = {
  podcasts: PropTypes.array,
  onSubscribeClick: PropTypes.func,
  onUnsubscribeClick: PropTypes.func,
  subscriptions: PropTypes.array
};

export default class SearchList extends React.Component {
  render() {
    const { podcasts, onSubscribeClick, onUnsubscribeClick, subscriptions } = this.props;

    const podcastItems = podcasts.map((item) => {
      const isSubbed = _.includes(subscriptions, item.id.toString());

      return <PodcastItem
        title={item.title}
        key={item.id}
        podcastId={item.id}
        item={item.item}
        isSubbed={isSubbed}
        onSubscribeClick={onSubscribeClick}
        onUnsubscribeClick={onUnsubscribeClick}
      />;
    });

    return (
      <div className="search-results">
        {podcastItems}
      </div>
    );
  }
}

SearchList.propTypes = propTypes;
