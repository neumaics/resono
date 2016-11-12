import React from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../actions/subscription-actions';

function getGetSubscriptions(props) {
  props.fetchSubscriptions();
}

class SubscriptionsContainer extends React.Component {
  componentWillMount() {
    getGetSubscriptions(this.props);
  }

  render() {
    const { subscriptions } = this.props;

    const subs = subscriptions.map ? subscriptions.map((item) => {
      return <p>{item.id}</p>;
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
  const subs = state.subscriptions.toJS();

  return {
    subscriptions: subs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSubscriptions: () => { dispatch(fetchSubscriptions()); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
