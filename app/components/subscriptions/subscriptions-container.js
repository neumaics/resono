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

// function mapStateToProps(state) {
//   return {};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {};
// }

export default connect()(SubscriptionsContainer);
