import React from 'react';
import { connect } from 'react-redux';
import * as search from '../../actions/search-actions';
import * as detail from '../../actions/detail-actions';
import SearchList from './search-list';
import SearchInput from './search-input';

class SearchContainer extends React.Component {
  render() {
    const { podcasts, onSearchClick, onItemClick } = this.props;

    return(
      <div>
        <SearchInput onSearchClick={onSearchClick} />
        <SearchList podcasts={podcasts} onItemSelect={onItemClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const podcasts = state.podcastSearch.get('podcasts');
  const query = state.query;

  return {
    query: query,
    podcasts: podcasts === undefined ? [] : podcasts.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchClick: (query) => { dispatch(search.fetchPodcasts(query)); },
    onItemClick: (id, feedUrl) => { dispatch(detail.fetchRssFeed(id, feedUrl)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
