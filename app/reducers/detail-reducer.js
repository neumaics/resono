import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE
} from '../actions/types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export function isFetchingRss(state = false, action) {
  switch (action.type) {
    case RSS_REQUEST: {
      return true;
    }
    case RSS_RECEIVE:
    case RSS_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function detail(state = initialState, action) {
  switch (action.type) {
    case RSS_RECEIVE: {
      const rss = Immutable.fromJS(action.data.rss) || initialState;
      return state.withMutations((mut) => {
        return mut.set('id', action.id).set('rss', rss);
      });
    }
    default: {
      return state;
    }
  }
}

export function detailErrors(state = initialState, action) {
  switch (action.type) {
    case RSS_FAILURE: {
      const error = Immutable.fromJS(action.error);

      return state.set('error', error);
    }
    default: {
      return state;
    }
  }
}
