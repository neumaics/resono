import {
  PLAY_PODCAST,
  PAUSE_PODCAST,
  STOP_PODCAST,
  CHANGE_POSITION,
  CHANGE_LENGTH,
  CHANGE_BYTES_LOADED,
  CHANGE_BYTES_TOTAL,
  CHANGE_VOLUME,
  statusTypes
} from './types';

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

export function changePosition(position) {
  return {
    type: CHANGE_POSITION,
    position: position
  };
}

export function changeLength(length) {
  return {
    type: CHANGE_LENGTH,
    length: length
  };
}

export function changeBytesTotal(bytesTotal) {
  return {
    type: CHANGE_BYTES_TOTAL,
    bytesTotal: bytesTotal
  };
}

export function changeBytesLoaded(bytesLoaded) {
  return {
    type: CHANGE_BYTES_LOADED,
    bytesLoaded: bytesLoaded
  };
}

export function changeVolume(newVolume) {
  return {
    type: CHANGE_VOLUME,
    volume: newVolume
  };
}
