import {
  CHANGE_PODCAST,
  PLAY_PODCAST,
  PAUSE_PODCAST,
  STOP_PODCAST,
  statusTypes
} from '../actions/types'

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  status: statusTypes.STOPPED
});

export function player(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PODCAST: {
      return state.set('currentPodcast', action.mediaUrl);
    }
    case PLAY_PODCAST: {
      return state.set('status', action.status);
    }
    case PAUSE_PODCAST: {
      return state.set('status', action.status);
    }
    case STOP_PODCAST:{
      return state.set('status', action.status);
    }
    default: {
      return state;
    }
  }
}
