import { connect } from 'react-redux'
import * as search from '../actions/podcast-search-actions'
import PodcastList from './podcast-search/podcast-list'

const mapStateToProps = (state) => {
  return {
    podcasts: [{title: 'freakonomics'}]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    search: dispatch(search.searchPodcasts(ownProps.query))
  }
}

const PodcastSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastList);

export default PodcastSearch;
