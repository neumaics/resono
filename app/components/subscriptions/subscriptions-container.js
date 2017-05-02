import React from 'react';
import { connect } from 'react-redux';
import { updateSubscription } from '../../actions/subscription-actions';

class SubscriptionsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateAll = this.updateAll(this.props.updateSubscription).bind(this);
  }

  updateAll(updateFunc) {
    return (ids) => {
      ids.forEach((id) => { updateFunc(id); });
    };
  }

  render() {
    const { subscriptions } = this.props;
    const ids = subscriptions.keySeq();

    const casts = subscriptions.valueSeq().map((p) => {
      return <p key={p.get('id')}>{p.get('title')}</p>;
    });

    return(
      <div className="subscriptions-container">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.updateAll(ids)}>
          <i className="fa fa-refresh"></i>
        </button>
        {casts}
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
