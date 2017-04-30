import {
  NEXT_EPISODE,
  PREV_EPISODE,
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

function getCurrentIndex(currentId, episodes) {
  const currentEp = episodes.find((ep) => ep.get('id') === currentId);
  const currentIdx = episodes.indexOf(currentEp);

  return currentIdx;
}

function current(state = '', action) {
  switch (action.type) {
    case NEXT_EPISODE: {
      if (!state) {
        return action.episodes.get(0).get('id');
      }
      const numEpisodes = action.episodes.size;
      const currentIdx = getCurrentIndex(action.current, action.episodes);

      if (currentIdx + 1 > numEpisodes) {
        return state;
      } else {
        const next = action.episodes.get(currentIdx + 1);
        return next.get('id');
      }
    }
    case PREV_EPISODE: {
      if (!state) {
        return action.episodes.get(0).get('id');
      }

      const currentIdx = getCurrentIndex(action.current, action.episodes);

      if (currentIdx - 1 < 0) {
        return state;
      } else {
        const next = action.episodes.get(currentIdx - 1);
        return next.get('id');
      }
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
