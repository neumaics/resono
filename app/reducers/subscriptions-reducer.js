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
      return Immutable.fromJS(action.data);
    }
    case SUBSCRIBE_FAILURE: {
      return state;
    }
    case SUBSCRIBE: {
      return state;
    }
    case UNSUBSCRIBE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
