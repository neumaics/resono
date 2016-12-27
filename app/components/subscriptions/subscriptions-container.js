import React from 'react';
import { connect } from 'react-redux';
import { updateSubscription } from '../../actions/subscription-actions';
import { changePodcast } from '../../actions/player-actions';

import _ from 'lodash';

class SubscriptionsContainer extends React.Component {

  render() {
    const { subscriptions, updateSubscription, changePodcast } = this.props;
    const subjs = _.values(subscriptions.toJS());

    const subs = subjs.map ? subjs.map((item) => {
      return (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{`Last Updated: ${item.lastUpdated}`}</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => updateSubscription(item.id)}>
            <i className="fa fa-refresh"></i>
          </button>
          <ul>
            {item.episodes.map((ep) => { return <li key={ep.id} onClick={() => changePodcast(ep.url)}>{ep.title}</li>; })}
          </ul>
        </div>
      );
    }) : <span></span>;

    return(
      <div>
        <h4>Subscriptions</h4>
        {subs}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSubscription: (id) => { dispatch(updateSubscription(id)); },
    changePodcast: (url) => { dispatch(changePodcast(url)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
