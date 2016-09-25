import { connect } from 'react-redux'
import * as search from '../actions/podcast-search-actions'
import PodcastList from './podcast-search/podcast-list'

const mapStateToProps = (state) => {
  const podcasts = state.podcastSearch.get('podcasts');
  const query = state.podcastSearch.get('query');

  return {
    query: query,
    podcasts: podcasts === undefined ? [] : podcasts.toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSearch: dispatch(search.searchPodcasts(ownProps.query))
  }
}

const PodcastSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastList);

export default PodcastSearch;
