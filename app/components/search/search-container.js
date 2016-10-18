import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as search from '../../actions/search-actions'
import * as detail from '../../actions/detail-actions'
import SearchList from './search-list'
import SearchInput from './search-input'

class SearchContainer extends React.Component {
  render() {
    const { podcasts, query, onSearchClick, onItemClick } = this.props;

    return(
      <div>
        <SearchInput onSearchClick={onSearchClick} />
        <SearchList podcasts={podcasts} onItemSelect={onItemClick} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const podcasts = state.podcastSearch.get('podcasts');
  const query = state.query;

  return {
    query: query,
    podcasts: podcasts === undefined ? [] : podcasts.toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchClick: (query) => { dispatch(search.fetchPodcasts(query)); },
    onItemClick: (id, feedUrl) => { dispatch(detail.fetchRssFeed(id, feedUrl)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
