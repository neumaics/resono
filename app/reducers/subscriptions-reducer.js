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
      console.log(action.data);
      const a = state.merge(action.data);
      return a;
    }
    case SUBSCRIBE_FAILURE: {
      return state;
    }
    case SUBSCRIBE: {
      console.log(action.id);
      const a = state.merge({id: action.id});
      console.log(a);
      return a;
    }
    case UNSUBSCRIBE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
