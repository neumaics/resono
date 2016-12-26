import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE,
  FETCH_SUBSCRIPTIONS,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SUBSCRIBE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_COMPLETE,
  UPDATE_ERROR
} from './types';
import Podcast from '../models/Podcast';
import axios from 'axios';
import parser from 'xml2json';

export function subscribeAndSave(id, feedUrl) {
  return function (dispatch) {
    return dispatch(fetchRssFeed(id, feedUrl))
      .then((detail) => {
        const podcast = new Podcast(id, feedUrl, detail);
        dispatch(subscribe(podcast.toMap()));
      })
      .catch((err) => {
        console.error(err);
        dispatch(subscribeFailure(id));
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

export function subscribeFailure(id) {
  return {
    type: SUBSCRIBE_FAILURE,
    id: id,
    message: `Podcast with id [${id}] has already been subscribed`
  };
}

export function fetchSubscriptions() {
  return {
    type: FETCH_SUBSCRIPTIONS,
  };
}

function updateRequest(id) {
  return {
    type: UPDATE_REQUEST,
    id: id
  };
}

function updateComplete(podcast) {
  return {
    type: UPDATE_COMPLETE,
    podcast: podcast
  };
}

function updateError(id, error) {
  return {
    type: UPDATE_ERROR,
    id: id,
    error: error
  };
}

export function updateSubscription(id) {
  return function (dispatch, getState) {
    dispatch(updateRequest(id));

    const subscription = getState().subscriptions.get(id);
    const feedUrl = subscription.get('feedUrl');

    return dispatch(fetchRssFeed(id, feedUrl))
      .then((detail) => {
        const podcast = new Podcast(id, feedUrl, detail);
        dispatch(updateComplete(podcast.toMap()));
      })
      .catch((err) => {
        console.error(err);
        dispatch(updateError(id, err));
      });
  };
}

function rssRequest(feedUrl) {
  return {
    type: RSS_REQUEST,
    feedUrl: feedUrl
  };
}

function rssReceive(id, data) {
  return {
    type: RSS_RECEIVE,
    id: id,
    data: data
  };
}

function rssRequestFailure(feedUrl, error) {
  return {
    type: RSS_FAILURE,
    feedUrl: feedUrl,
    error: error
  };
}

export function fetchRssFeed(id, feedUrl) {
  return function (dispatch) {
    dispatch(rssRequest(feedUrl));

    return (axios.get(feedUrl)
      .then((response) => {
        const data = parser.toJson(response.data, { object: true });
        dispatch(rssReceive(id, data.rss));
        return data.rss.channel;
      })
      .catch((error) => {
        dispatch(rssRequestFailure(feedUrl, error));
      }));
  };
}
