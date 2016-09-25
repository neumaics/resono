import { SEARCH_PODCASTS } from '../actions/types';
import axios from 'axios';
import Immutable from 'immutable';

const initialSearchState = Immutable.fromJS({
  query: '',
  podcasts: []
});

function podcastSearch(state = initialSearchState, action) {
  switch (action.type) {
    case SEARCH_PODCASTS: {
      const newState = state.withMutations(map => {
        map.set('query', action.query).set('podcasts', Immutable.fromJS([{title: 'hello'}, {title: 'goodbye'}]));
      });

      // console.log(newState.get('query'), newState.get('podcasts'));

      return newState;
    }
    default:
      return state;
  }
}

export default podcastSearch;
