export const PODCASTS_REQUEST = 'REQUEST_PODCASTS';
export const PODCASTS_RECEIVE = 'RECEIVE_PODCASTS';
export const PODCASTS_FAILURE = 'FAILURE_PODCASTS';

export const RSS_REQUEST = 'RSS_REQUEST';
export const RSS_RECEIVE = 'RSS_RECEIVE';
export const RSS_FAILURE = 'RSS_FAILURE';

export const CHANGE_PODCAST = 'CHANGE_PODCAST';
export const PLAY_PODCAST = 'PLAY_PODCAST';
export const PAUSE_PODCAST = 'PAUSE_PODCAST';
export const STOP_PODCAST = 'STOP_PODCAST';
export const CHANGE_POSITION = 'CHANGE_POSITION';
export const CHANGE_LENGTH = 'CHANGE_LENGTH';
export const CHANGE_BYTES_LOADED = 'CHANGE_BYTES_LOADED';
export const CHANGE_BYTES_TOTAL = 'CHANGE_BYTES_TOTAL';

export const statusTypes = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED'
};

export const FETCH_SUBSCRIPTIONS = 'FETCH_SUBSCRIPTIONS';
export const SUBSCRIBE = 'SUBSCRIBE_PODCAST';
export const UNSUBSCRIBE = 'UNSUBSCRIBE_PODCAST';
export const SUBSCRIBE_FAILURE = 'SUBSCRIBE_ERROR';
export const UNSUBSCRIBE_FAILURE = 'SUBSCRIBE_FAILURE';
export const SUBSCRIPTIONS_LOADED = 'SUBSCRIPTIONS_LOADED';

export const orderTypes = {
  ASCENDING: 'asc',
  DESCENDING: 'desc'
};

export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_COMPLETE = 'UPDATE_COMPLETE';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const CONFIG_CHANGED = 'CONFIG_CHANGED';
export const CONFIG_UPDATED = 'CONFIG_UPDATED';
export const CONFIG_LOADED = 'CONFIG_LOADED';
