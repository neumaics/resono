import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { changePodcast } from '../../actions/player-actions';
import { fetchRssFeed } from '../../actions/detail-actions';
import { _ } from 'lodash';
import Spinner from '../common/spinner';
import DetailList from './detail-list';

function getPodcastData(props) {
  props.fetchRssFeed(props.params.id, props.feedUrl);
}

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    browserHistory.goBack();
  }

  componentWillMount() {
    getPodcastData(this.props);
  }

  render() {
    const { isFetchingRss, feedData, onPodcastSelect } = this.props;

    let detailjsx;
    if (isFetchingRss || feedData === undefined) {
      detailjsx = <Spinner visible={isFetchingRss} />;
    } else {
      detailjsx = (
        <div>
          <p>{feedData.channel.title}</p>
          <DetailList items={feedData.channel.item} onItemSelect={onPodcastSelect} />
        </div>
      );
    }

    return (
      <div>
        <button className="btn btn-primary btn-sm" onClick={this.onClick}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button className="btn btn-primary btn-sm">
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
    fetchRssFeed: (id, feedUrl) => {
      dispatch(fetchRssFeed(id, feedUrl));
    },
    onPodcastSelect: (item) => {
      const url = item.enclosure === undefined ? '/' : item.enclosure.url;
      dispatch(changePodcast(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
