import {
  FETCH_SUBSCRIPTIONS,
  SUBSCRIBE_FAILURE,
  SUBSCRIBE,
  UNSUBSCRIBE
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
      return state.set(action.id, { id: action.id, feedUrl: action.feedUrl, detail: action.detail });
    }
    case UNSUBSCRIBE: {
      return state.delete(action.id);
    }
    default: {
      return state;
    }
  }
}
