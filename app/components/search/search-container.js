import React from 'react';
import { connect } from 'react-redux';
import { fetchPodcasts } from '../../actions/search-actions';
import { fetchAndSubscribe, unsubscribe } from '../../actions/subscription-actions';
import SearchList from './search-list';
import SearchInput from './search-input';

class SearchContainer extends React.Component {
  render() {
    const { results, query, subscriptions, onSearchClick, onSubscribeClick, onUnsubscribeClick } = this.props;

    return (
      <div className="search-container component-container">
        <SearchInput onSearchClick={onSearchClick} query={query} />
        <SearchList
          podcasts={results}
          subscriptions={subscriptions}
          onSubscribeClick={onSubscribeClick}
          onUnsubscribeClick={onUnsubscribeClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const results = state.search.results;
  const subscriptions = state.subscriptions.keySeq().toJS();

  return {
    query: state.search.query,
    results: results === undefined ? [] : results.toJS(),
    subscriptions: subscriptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchClick: (query) => { dispatch(fetchPodcasts(query)); },
    onSubscribeClick: (id, feedUrl) => { dispatch(fetchAndSubscribe(id, feedUrl)); },
    onUnsubscribeClick: (id) => { dispatch(unsubscribe(id)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
