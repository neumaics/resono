import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SUBSCRIBE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_COMPLETE,
  UPDATE_ERROR,
  SUBSCRIPTIONS_LOADED,
  CHANGE_SORT_ORDER
} from './types';
import Podcast from '../models/Podcast';
import axios from 'axios';
import parser from 'xml2json';

export function subscriptionsLoaded(subscriptions) {
  return {
    type: SUBSCRIPTIONS_LOADED,
    subscriptions: subscriptions
  };
}

export function fetchAndSubscribe(id, feedUrl) {
  return function (dispatch) {
    dispatch(rssRequest(feedUrl));

    return fetchRss(feedUrl)
      .then((detail) => {
        const podcast = Podcast.fromRss(id, feedUrl, detail);
        dispatch(subscribe(Podcast.toMap(podcast)));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(subscribeFailure(id, error.response));
        } else {
          dispatch(subscribeFailure(id, { message: error.message }));
        }
      });
  };
}

export function subscribe(podcast) {
  return {
    type: SUBSCRIBE,
    podcast: podcast
  };
}

export function unsubscribe(id) {
  return {
    type: UNSUBSCRIBE,
    id: id
  };
}

export function subscribeFailure(id, error) {
  return {
    type: SUBSCRIBE_FAILURE,
    id: id,
    error: error
  };
}

export function updateRequest(id) {
  return {
    type: UPDATE_REQUEST,
    id: id
  };
}

export function updateComplete(podcast) {
  return {
    type: UPDATE_COMPLETE,
    podcast: podcast
  };
}

export function updateError(id, error) {
  return {
    type: UPDATE_ERROR,
    id: id,
    error: error
  };
}

export function updateSubscription(id) {
  return function (dispatch, getState) {
    dispatch(updateRequest(id));

    const subscription = getState().subscriptions.get(id.toString());
    const feedUrl = subscription.get('feedUrl');

    return fetchRss(feedUrl)
      .then((detail) => {
        const podcast = Podcast.fromRss(id, feedUrl, detail);

        dispatch(updateComplete(Podcast.toMap(podcast)));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(updateError(id, error.response));
        } else {
          dispatch(updateError(id, { message: error.message }));
        }
      });
  };
}

export function rssRequest(feedUrl) {
  return {
    type: RSS_REQUEST,
    feedUrl: feedUrl
  };
}

export function rssReceive(id, data) {
  return {
    type: RSS_RECEIVE,
    id: id,
    data: data
  };
}

export function rssRequestFailure(feedUrl, error) {
  return {
    type: RSS_FAILURE,
    feedUrl: feedUrl,
    error: error
  };
}

function fetchRss(feedUrl) {
  return axios.get(feedUrl)
    .then((response) => {
      const data = parser.toJson(response.data, { object: true });
      return data.rss.channel;
    });
}

export function changeSortOrder(sortOrder) {
  return {
    type: CHANGE_SORT_ORDER,
    order: sortOrder
  };
}
