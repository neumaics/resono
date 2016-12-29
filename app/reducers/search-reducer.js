import {
  SEARCH_PODCASTS,
  PODCASTS_REQUEST,
  PODCASTS_RECEIVE,
  PODCASTS_FAILURE
} from '../actions/types';
import { combineReducers } from 'redux';
import Immutable from 'immutable';

export function query(state = '', action) {
  switch (action.type) {
    case SEARCH_PODCASTS: {
      return action.query;
    }
    default: {
      return state;
    }
  }
}

export function isFetching(state = false, action) {
  switch (action.type) {
    case PODCASTS_REQUEST: {
      return true;
    }
    case PODCASTS_RECEIVE: {
      return false;
    }
    case PODCASTS_FAILURE: {
      return false;
    }
    default:
      return state;
  }
}

export function results(state = Immutable.List(), action) {
  switch (action.type) {
    case PODCASTS_RECEIVE: {
      return Immutable.List(action.podcasts);
    }
    case PODCASTS_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export const search = combineReducers({
  query,
  isFetching,
  results
});
