import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE
} from '../actions/types';
import Immutable from 'immutable';
import { combineReducers } from 'redux';

const initialState = Immutable.fromJS({});

function isFetching(state = false, action) {
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

function error(state = Immutable.Map(), action) {
  switch (action.type) {
    case RSS_FAILURE: {
      return Immutable.fromJS(action.error);
    }
    default: {
      return state;
    }
  }
}

function feed(state = Immutable.Map(), action) {
  switch (action.type) {
    case RSS_RECEIVE: {
      // TODO: add error checking
      return Immutable.fromJS(action.data);
    }
    default: {
      return state;
    }
  }
}

export const detail = combineReducers({
  isFetching,
  error,
  feed
});
