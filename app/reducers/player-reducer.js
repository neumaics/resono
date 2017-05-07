import {
  PLAY_PODCAST,
  PAUSE_PODCAST,
  STOP_PODCAST,
  CHANGE_POSITION,
  CHANGE_LENGTH,
  CHANGE_BYTES_TOTAL,
  CHANGE_BYTES_LOADED,
  CHANGE_VOLUME,
  NEXT_EPISODE,
  PLAY_EPISODE,
  PREV_EPISODE,
  statusTypes
} from '../actions/types';
import { combineReducers } from 'redux';

function status(state = statusTypes.STOPPED, action) {
  switch (action.type) {
    case PLAY_PODCAST:
    case PAUSE_PODCAST:
    case STOP_PODCAST:{
      return action.status;
    }
    default: {
      return state;
    }
  }
}

function position(state = 0.0, action) {
  switch (action.type) {
    case CHANGE_POSITION: {
      return action.position;
    }
    case NEXT_EPISODE:
    case PREV_EPISODE:
    case PLAY_EPISODE: {
      return 0.0;
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
    case NEXT_EPISODE:
    case PREV_EPISODE:
    case PLAY_EPISODE: {
      return 1.0;
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
    case NEXT_EPISODE:
    case PREV_EPISODE:
    case PLAY_EPISODE: {
      return 1.0;
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
    case NEXT_EPISODE:
    case PREV_EPISODE:
    case PLAY_EPISODE: {
      return 0.0;
    }
    default: {
      return state;
    }
  }
}

function volume(state = 80, action) {
  switch (action.type) {
    case CHANGE_VOLUME: {
      return action.volume;
    }
    default: {
      return state;
    }
  }
}

export const player = combineReducers({
  status,
  position,
  length,
  bytesTotal,
  bytesLoaded,
  volume
});
