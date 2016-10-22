import {
  CHANGE_PODCAST,
  PLAY_PODCAST,
  PAUSE_PODCAST,
  STOP_PODCAST,
  statusTypes
} from '../actions/types'
import { combineReducers } from 'redux'

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
      return action.mediaUrl;
    }
    default: {
      return state;
    }
  }
}

export const player = combineReducers({
  status,
  currentPodcast
})
