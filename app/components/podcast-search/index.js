import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as search from '../../actions/podcast-search-actions'
import * as rss from '../../actions/rss-actions'
import PodcastList from './podcast-list'
import SearchInput from './search-input'

const searchContainer = ({ podcasts, query, onSearchClick, onItemSelect }) => {

  return(
    <div>
      <SearchInput onSearchClick={onSearchClick} />
      <PodcastList podcasts={podcasts} onItemSelect={onItemSelect} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const podcasts = state.podcastSearch.get('podcasts');
  const query = state.query;

  return {
    query: query,
    podcasts: podcasts === undefined ? [] : podcasts.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchClick: (query) => { dispatch(search.fetchPodcasts(query)); },
    onItemSelect: (item) => { dispatch(rss.fetchRssFeed(item.feedUrl)); }
  }
}

const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(searchContainer);

export default Search;
