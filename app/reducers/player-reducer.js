import {
  CHANGE_PODCAST,
  PLAY_PODCAST,
  PAUSE_PODCAST,
  STOP_PODCAST,
  CHANGE_POSITION,
  CHANGE_LENGTH,
  CHANGE_BYTES_TOTAL,
  CHANGE_BYTES_LOADED,
  statusTypes
} from '../actions/types';
import { combineReducers } from 'redux';
import Immutable from 'immutable';

function status(state = statusTypes.STOPPED, action) {
  switch (action.type) {
    case CHANGE_PODCAST: {
      return statusTypes.STOPPED;
    }
    case PLAY_PODCAST: {
      return action.status;
    }
    case PAUSE_PODCAST: {
      return action.status;
    }
    case STOP_PODCAST:{
      return action.status;
    }
    default: {
      return state;
    }
  }
}

function currentPodcast(state = '/', action) {
  switch (action.type) {
    case CHANGE_PODCAST: {
      return action.url;
    }
    default: {
      return state;
    }
  }
}


function position(state = 0.0, action) {
  switch (action.type) {
    case CHANGE_POSITION: {
      return action.position
    }
    default: {
      return state;
    }
  }
}

function length(state = 1.0, action) {
  switch (action.type) {
    case CHANGE_LENGTH: {
      return action.length;
    }
    default: {
      return state;
    }
  }
}

function bytesTotal(state = 1.0, action) {
  switch (action.type) {
    case CHANGE_BYTES_TOTAL: {
      return action.bytesTotal ? action.bytesTotal : state;
    }
    default: {
      return state;
    }
  }
}
function bytesLoaded(state = 0.0, action) {
  switch (action.type) {
    case CHANGE_BYTES_LOADED: {
      return action.bytesLoaded ? action.bytesLoaded : state;
    }
    default: {
      return state;
    }
  }
}

export const player = combineReducers({
  status,
  currentPodcast,
  position,
  length,
  bytesTotal,
  bytesLoaded
});
