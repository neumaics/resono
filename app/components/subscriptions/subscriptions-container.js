import React from 'react';
import { connect } from 'react-redux';
import { updateSubscription } from '../../actions/subscription-actions';
import _ from 'lodash';

class SubscriptionsContainer extends React.Component {

  render() {
    const { subscriptions, updateSubscription } = this.props;
    const subjs = _.values(subscriptions.toJS());

    const subs = subjs.map ? subjs.map((item) => {
      return (
        <div>
          <p>{item.title}</p>
          <p>{`Las Updated: ${item.lastUpdated.toString()}`}</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => updateSubscription(item.id)}>
            <i className="fa fa-refresh"></i>
          </button>
          <ul>
            {item.episodes.map((ep) => { return <li>{ep.title}</li>; })}
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
    updateSubscription: (id) => { dispatch(updateSubscription(id)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
