import {
  CHANGE_PODCAST,
  PLAY_PODCAST,
  PAUSE_PODCAST,
  STOP_PODCAST,
  statusTypes
} from './types';

export function changePodcast(mediaUrl) {
  return {
    type: CHANGE_PODCAST,
    mediaUrl: mediaUrl
  };
}

export function playPodcast() {
  return {
    type: PLAY_PODCAST,
    status: statusTypes.PLAYING
  };
}

export function pausePodcast() {
  return {
    type: PAUSE_PODCAST,
    status: statusTypes.PAUSED
  };
}

export function stopPodcast() {
  return {
    type: STOP_PODCAST,
    status: statusTypes.STOPPED
  };
}
