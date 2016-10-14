import {
  SEARCH_PODCASTS,
  PODCASTS_REQUEST,
  PODCASTS_RECEIVE,
  PODCASTS_FAILURE
} from '../actions/types';

import Immutable from 'immutable';

const initialSearchState = Immutable.fromJS({
  fetching: false,
  podcasts: []
});

export const query = (state = '', action) => {
  switch (action.type) {
    case SEARCH_PODCASTS: {
      return action.query || '';
    }
    default: {
      return state;
    }
  }
}

export const podcastSearch = (state = initialSearchState, action) => {
  switch (action.type) {
    case PODCASTS_REQUEST: {
      return state.set('fetching', true);
    }
    case PODCASTS_RECEIVE: {
      return state.withMutations((mut) => {
        return mut.set('fetching', false).set('podcasts', Immutable.fromJS(action.podcasts));
      });
    }
    case PODCASTS_FAILURE: {
      // TODO: Add some sort of message passing
      return state.withMutations((mut) => {
        return mut.set('fetching', false).set('podcasts', Immutable.fromJS([]));
      });
    }
    default:
      return state;
  }
}
