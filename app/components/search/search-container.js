import React from 'react';
import { connect } from 'react-redux';
import * as search from '../../actions/search-actions';
import SearchList from './search-list';
import SearchInput from './search-input';

class SearchContainer extends React.Component {
  render() {
    const { results, onSearchClick, onItemClick } = this.props;

    return(
      <div>
        <SearchInput onSearchClick={onSearchClick} />
        <SearchList podcasts={results} onItemSelect={onItemClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const results = state.search.results;
  const query = state.search.query;

  return {
    query,
    podcasts: results === undefined ? [] : results.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchClick: (query) => { dispatch(search.fetchPodcasts(query)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
