import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE,
  PODCAST_LOOKUP_REQUEST,
  PODCAST_LOOKUP_FAILURE,
  PODCAST_LOOKUP_RECIEVE
} from '../actions/types';
import Immutable from 'immutable';
import { combineReducers } from 'redux';

const initialState = Immutable.Map();

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

function error(state = initialState, action) {
  switch (action.type) {
    case RSS_FAILURE: {
      return Immutable.fromJS(action.error);
    }
    default: {
      return state;
    }
  }
}

function feed(state = initialState, action) {
  switch (action.type) {
    case PODCAST_LOOKUP_FAILURE:
    case RSS_RECEIVE: {
      // TODO: add error checking
      return Immutable.fromJS(action.data);
    }
    default: {
      return state;
    }
  }
}

function feedUrl(state = '', action) {
  switch (action.type) {
    case PODCAST_LOOKUP_REQUEST: {
      return '';
    }
    case PODCAST_LOOKUP_RECIEVE: {
      return action.data.feedUrl;
    }
    default: {
      return state;
    }
  }
}

export const detail = combineReducers({
  isFetching,
  error,
  feed,
  feedUrl
});
