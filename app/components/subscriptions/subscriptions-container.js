import React from 'react';
import { connect } from 'react-redux';
import { updateSubscription } from '../../actions/subscription-actions';
import { changePodcast } from '../../actions/player-actions';

// import _ from 'lodash';

class SubscriptionsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateAll = this.updateAll(this.props.updateSubscription).bind(this);
  }

  updateAll(updateFunc) {
    return (ids) => {
      ids.forEach((id) => {
        updateFunc(id);
      });
    };
  }

  render() {
    const { subscriptions, changePodcast } = this.props;
    const subjs = subscriptions.valueSeq();
    const ids = subscriptions.keySeq().toJS();

    const episodes = subjs.
      map(p => { return [p.get('title'), p.get('episodes')]; }).
      flatMap((p) => { return p[1].map(e => { return e.set('podcast', p[0]); }); }).
      sortBy((e) => -e.get('pubDate')).
      toJS().
      map((e) => { return <li key={e.id}>{`${e.podcast} - ${e.title}`}</li>; });

    /*const subs = subList.map ? subList.map((item) => {
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
    }) : <span></span>;*/

    return(
      <div>
        <h4>Subscriptions</h4>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.updateAll(ids)}>
          <i className="fa fa-refresh"></i>
        </button>
        <ul>{episodes}</ul>
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
