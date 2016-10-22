import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchRssFeed } from '../../actions/detail-actions'
import { changePodcast } from '../../actions/player-actions'

import Spinner from '../common/spinner'
import DetailList from './detail-list'

class DetailContainer extends React.Component {
  onClick(event) {
    event.preventDefault();
    browserHistory.goBack();
  }

  render() {
    const { params, isFetchingRss, feedData, onPodcastSelect } = this.props;

    let detailjsx;
    if (isFetchingRss || feedData === undefined) {
      detailjsx = <Spinner visible={isFetchingRss} />
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
        {detailjsx}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const detail = state.detail.get('rss');

  if (state.isFetchingRss) {
    return {
      isFetchingRss: state.isFetchingRss
    };
  } else {
    return {
      isFetchingRss: state.isFetchingRss,
      feedData: detail !== undefined ? detail.toJS() : undefined // TODO: eugh.
    };
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onPodcastSelect: (item) => {
      const url = item.enclosure === undefined ? '/' : item.enclosure.url;
      dispatch(changePodcast(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
