import React from 'react';
import { connect } from 'react-redux';
import { subscribeAndSave } from '../../actions/subscription-actions';
import { getAllPodcastData } from '../../actions/detail-actions';
import { Link } from 'react-router';
import Spinner from '../common/spinner';

function getPodcastData(props) {
  props.getAllPodcastData(props.params.id);
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

function mapStateToProps(state) {
  const feedUrl = state.detail.feedUrl;
  const feed = state.detail.feed;

  return {
    isFetchingRss: state.detail.isFetching,
    feedData: feed.size > 0 ? feed.toJS() : undefined, // TODO: eugh
    feedUrl: feedUrl || ''
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPodcastData: (id) => { return dispatch(getAllPodcastData(id)); },
    onSubscribeClick: (id) => { dispatch(subscribeAndSave(id)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
