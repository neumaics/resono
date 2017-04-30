import React from 'react';
import { connect } from 'react-redux';
import { updateSubscription, changeSortOrder } from '../../actions/subscription-actions';
import { orderTypes as order } from '../../actions/types';

import EpisodeList from './episode-list';

class SubscriptionsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateAll = this.updateAll(this.props.updateSubscription).bind(this);
    this.toggleSortOrder = this.toggleSortOrder(this.props.changeSortOrder).bind(this);
  }

  updateAll(updateFunc) {
    return (ids) => {
      ids.forEach((id) => { updateFunc(id); });
    };
  }

  toggleSortOrder(changeSortOrder) {
    return (currentOrder) => {
      const newOrder = currentOrder === order.ASCENDING ? order.DESCENDING : order.ASCENDING;

      changeSortOrder(newOrder);
    };
  }

  render() {
    const { subscriptions, playlist } = this.props;
    const episodes = subscriptions
      .valueSeq()
      .map(p => { return [p.get('title'), p.get('episodes')]; })
      .flatMap((p) => { return p[1].map(e => {
        return e.set('podcast', p[0]);
      }); });

    const ids = subscriptions.keySeq().toJS();
    const order = playlist.order;

    const numEpisodes = episodes
      .reduce((a, b) => { return b.get('listened') ? a : a + 1; }, 0);

    return(
      <div className="subscriptions-container">
        <h4>Subscriptions <span className="tag tag-default">{numEpisodes}</span></h4>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.updateAll(ids)}>
          <i className="fa fa-refresh"></i>
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.toggleSortOrder(order)}>
          <i className="fa fa-sort-down"></i>
        </button>
        <EpisodeList episodes={episodes} sortBy="pubDate" order={order} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions,
    playlist: state.playlist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSubscription: (id) => { dispatch(updateSubscription(id)); },
    changeSortOrder: (order) => { dispatch(changeSortOrder(order)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
