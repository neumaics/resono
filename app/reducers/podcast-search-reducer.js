import { SEARCH_PODCASTS } from '../actions/types';
import Immutable from 'immutable';

const initialSearchState = Immutable.fromJS({
  query: '',
  podcasts: []
});

function podcastSearch(state = initialSearchState, action) {
  switch (action.type) {
    case SEARCH_PODCASTS: {
      return state.set('query', action.query);
    }
    default:
      return state;
  }
}

export default podcastSearch;
