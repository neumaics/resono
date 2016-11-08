import {
  SUBSCRIBE,
  UNSUBSCRIBE
} from '../actions/types';

import Immutable from 'immutable';

const initialState = Immutable.Map();

export function subscriptions(state = initialState, action) {
  switch (action.type) {
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
