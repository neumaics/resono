import { connect } from 'react-redux'
import * as search from '../../actions/podcast-search-actions'
import PodcastList from './podcast-list'

const mapStateToProps = (state) => {
  const podcasts = state.podcastSearch.get('podcasts');
  const query = state.query;

  return {
    query: query,
    podcasts: podcasts === undefined ? [] : podcasts.toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('ownProps', ownProps);
  return {
    onSearchClick: dispatch(search.fetchPodcasts(ownProps.query))
  }
}

const PodcastSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastList);

export default PodcastSearch;
