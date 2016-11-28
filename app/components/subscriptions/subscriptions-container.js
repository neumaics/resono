import React from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../actions/subscription-actions';
import _ from 'lodash';

function getSubscriptions(props) {
  props.fetchSubscriptions();
}

class SubscriptionsContainer extends React.Component {
  componentWillMount() {
    getSubscriptions(this.props);
  }

  render() {
    const { subscriptions } = this.props;
    const subjs = _.values(subscriptions.toJS());
    console.log(subscriptions);

    const subs = subjs.map ? subjs.map((item) => {
      return (
        <div>
          <p>{item.detail.title}</p>
          <p>{item.detail.description}</p>
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
    fetchSubscriptions: () => { dispatch(fetchSubscriptions()); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
