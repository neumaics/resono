import React from 'react';
import { connect } from 'react-redux';
import { fetchPodcasts } from '../../actions/search-actions';
import { subscribeAndSave } from '../../actions/subscription-actions';
import SearchList from './search-list';
import SearchInput from './search-input';

class SearchContainer extends React.Component {
  render() {
    const { results, onSearchClick, onSubscribeClick } = this.props;

    return (
      <div>
        <SearchInput onSearchClick={onSearchClick} />
        <SearchList podcasts={results} onSubscribeClick={onSubscribeClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const results = state.search.results;
  const query = state.search.query;

  return {
    query,
    results: results === undefined ? [] : results.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchClick: (query) => { dispatch(fetchPodcasts(query)); },
    onSubscribeClick: (id, feedUrl) => { dispatch(subscribeAndSave(id, feedUrl)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
