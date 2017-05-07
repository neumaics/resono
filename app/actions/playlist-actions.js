import {
  NEXT_EPISODE,
  PLAY_EPISODE,
  PREV_EPISODE,
  TOGGLE_SORT_ORDER
} from './types';


export function toggleSort() {
  return {
    type: TOGGLE_SORT_ORDER
  };
}

export function nextEpisode(currentId, episodes) {
  return {
    type: NEXT_EPISODE,
    current: currentId,
    episodes
  };
}

export function prevEpisode(currentId, episodes) {
  return {
    type: PREV_EPISODE,
    current: currentId,
    episodes
  };
}

export function playEpisode(episodeId) {
  return {
    type: PLAY_EPISODE,
    episodeId
  };
}
