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
        {detailjsx}
        <button className="btn btn-primary" onClick={this.onClick}>back</button>
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
      const url = item['media:content'] === undefined ? (item.enclosure === undefined ? '/' : item.enclosure.url) : item['media:content'].url;
      dispatch(changePodcast(url))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
