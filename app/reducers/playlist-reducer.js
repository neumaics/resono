import {
  NEXT_EPISODE,
  PREV_EPISODE,
  PLAY_EPISODE,
  TOGGLE_SORT_ORDER,
  orderTypes
} from '../actions/types';
import { combineReducers } from 'redux';

function sort(state = orderTypes.ASCENDING, action) {
  switch (action.type) {
    case TOGGLE_SORT_ORDER: {
      return state === orderTypes.ASCENDING ? orderTypes.DESCENDING : orderTypes.ASCENDING;
    }
    default: {
      return state;
    }
  }
}

export function getCurrentIndex(currentId, episodes) {
  if (!episodes) { return -1; } // TODO: consider using options.
  const currentEp = episodes.find((ep) => ep.get('id') === currentId);
  const currentIdx = episodes.indexOf(currentEp);

  return currentIdx;
}

export function getNext(currentId, episodes) {
  if (!episodes) { return null; } // TODO: eww. consider using options.
  const numEpisodes = episodes.size;
  const currentIdx = getCurrentIndex(currentId, episodes);

  if (currentIdx < 0) {
    return null;
  } else if (currentIdx + 1 >= numEpisodes) {
    return episodes.get(0).get('id');
  } else {
    return episodes.get(currentIdx + 1).get('id');
  }
}

export function getPrevious(currentId, episodes) {
  if (!episodes) { return null; }

  return getNext(currentId, episodes.reverse());
}

function current(state = '', action) {
  switch (action.type) {
    case NEXT_EPISODE: {
      return getNext(action.current, action.episodes) || state;
    }
    case PREV_EPISODE: {
      return getPrevious(action.current, action.episodes) || state;
    }
    case PLAY_EPISODE: {
      return action.episodeId;
    }
    default: {
      return state;
    }
  }
}

export const playlist = combineReducers({
  sort,
  current
});
