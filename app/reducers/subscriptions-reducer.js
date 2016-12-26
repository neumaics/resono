import {
  FETCH_SUBSCRIPTIONS,
  SUBSCRIBE_FAILURE,
  SUBSCRIBE,
  UNSUBSCRIBE,
  UPDATE_COMPLETE
} from '../actions/types';
import Immutable from 'immutable';

const initialState = Immutable.Map();

export function subscriptions(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS: {
      return state;
    }
    case SUBSCRIBE_FAILURE: {
      return state;
    }
    case SUBSCRIBE: {
      return state.set(action.podcast.get('id'), action.podcast);
    }
    case UPDATE_COMPLETE: {
      const updated = Immutable.Map().set(action.podcast.get('id'), action.podcast);

      return state.mergeDeep(updated);
    }
    case UNSUBSCRIBE: {
      return state.delete(action.id);
    }
    default: {
      return state;
    }
  }
}
