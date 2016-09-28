import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

const PodcastSearch = connect(
  mapStateToProps
)(PodcastList);

export default PodcastSearch;
