import React from 'react'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchRssFeed } from '../../actions/detail-actions'
import Spinner from '../common/spinner'
import _ from 'lodash'

import DetailList from './detail-list'

class DetailContainer extends React.Component {
  onClick(event) {
    event.preventDefault();
    browserHistory.goBack();
  }

  render() {
    const { params, isFetchingRss, feedData } = this.props;

    let detailjsx;
    if (isFetchingRss) {
      detailjsx = <Spinner visible={isFetchingRss} />
    } else {
      detailjsx = (
        <div>
          <p>{feedData.channel.title}</p>
          <DetailList items={feedData.channel.item} onItemSelect={() => console.log('hi')} />
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

  if (state.isFetchingRss) {
    return {
      isFetchingRss: state.isFetchingRss
    };
  } else {
    return {
      isFetchingRss: state.isFetchingRss,
      feedData: state.detail.get('rss').toJS()
    };
  }

}

const mapDispatchToProps = (dispatch, params) => {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
