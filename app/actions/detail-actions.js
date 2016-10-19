import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE
} from './types'
import axios from 'axios'
import parser from 'xml2json'

export function rssRequest(feedUrl) {
  return { type: RSS_REQUEST, feedUrl: feedUrl };
}

export function rssReceive(id, data) {
  return {
    type: RSS_RECEIVE,
    id: id,
    data: data
  }
}

export function rssRequestFailure(feedUrl, error) {
  return {
    type: RSS_FAILURE,
    feedUrl: feedUrl,
    error: error
  }
}

export function fetchRssFeed(id, feedUrl) {
  return function (dispatch) {
    dispatch(rssRequest(feedUrl));

    return axios.get(feedUrl)
      .then((response) => {
        const data = parser.toJson(response.data, { object: true });
        dispatch(rssReceive(id, data));
      })
      .catch((error) => {
        dispatch(rssRequestFailure(feedUrl, error));
      });
  }
}