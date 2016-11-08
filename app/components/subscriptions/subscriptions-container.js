import React from 'react';
import { connect } from 'react-redux';

class SubscriptionsContainer extends React.Component {
  render() {
    return(
      <div>
        <h4>Subscriptions</h4>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const subs = state.subscriptions.toJS();

  return {
    subscriptions: subs
  };
}

function mapDispatchToProps(/*dispatch*/) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
