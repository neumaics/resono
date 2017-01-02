import {
  FETCH_SUBSCRIPTIONS,
  SUBSCRIBE_FAILURE,
  SUBSCRIBE,
  UNSUBSCRIBE,
  UPDATE_COMPLETE,
  SUBSCRIPTIONS_LOADED,
  CHANGE_SORT_ORDER
} from '../actions/types';
import Immutable from 'immutable';

const initialState = Immutable.Map();

export function subscriptions(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIPTIONS_LOADED: {
      return action.subscriptions;
    }
    case FETCH_SUBSCRIPTIONS: {
      return state;
    }
    case SUBSCRIBE_FAILURE: {
      return state;
    }
    case SUBSCRIBE: {
      return state.set(action.podcast.get('id').toString(), action.podcast);
    }
    case UPDATE_COMPLETE: {
      const id = action.podcast.get('id').toString();
      const updated = Immutable.Map().set(id, action.podcast);

      return state.mergeDeep(updated);
    }
    case UNSUBSCRIBE: {
      return state.delete(action.id.toString());
    }
    default: {
      return state;
    }
  }
}

export function playlist(state = initialState, action) {
  switch(action.type) {
    case CHANGE_SORT_ORDER: {
      return state.set('order', action.order);
    }
    default: {
      return state;
    }
  }
}
