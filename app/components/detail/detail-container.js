import React from 'react';
import { connect } from 'react-redux';
import { subscribeAndSave } from '../../actions/subscription-actions';
import { fetchRssFeed } from '../../actions/detail-actions';
import { _ } from 'lodash';
import { Link } from 'react-router';
import Spinner from '../common/spinner';

function getPodcastData(props) {
  props.fetchRssFeed(props.params.id, props.feedUrl);
}

class DetailContainer extends React.Component {
  componentWillMount() {
    getPodcastData(this.props);
  }

  render() {
    const { params, isFetchingRss, feedData, onSubscribeClick } = this.props;

    let detailjsx;
    if (isFetchingRss || feedData === undefined) {
      detailjsx = <Spinner visible={isFetchingRss} />;
    } else {
      detailjsx = (
        <div>
          <p>{feedData.channel.title}</p>
          <p>{feedData.channel.description}</p>
        </div>
      );
    }

    return (
      <div>
        <Link to={'/podcast'} className="btn btn-primary btn-sm">
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </Link>
        <button className="btn btn-primary btn-sm" onClick={() => onSubscribeClick(params.id)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
        {detailjsx}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params;
  const info = _.find(state.search.results.toJS(), (o) => { return o.id == id; });
  const detail = state.detail.feed;

  return {
    isFetchingRss: state.detail.isFetching,
    feedData: detail.size > 0 ? detail.toJS() : undefined, // TODO: eugh.
    feedUrl: info.feedUrl
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRssFeed: (id, feedUrl) => { dispatch(fetchRssFeed(id, feedUrl)); },
    onSubscribeClick: (id) => { dispatch(subscribeAndSave(id)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
