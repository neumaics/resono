import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE
} from './types'
import axios from 'axios'
import parser from 'xml2json'

export const rssRequest = (feedUrl) => {
  return { type: RSS_REQUEST, feedUrl: feedUrl }
}

export const rssReceive = (feedData) => {
  return {
    type: RSS_RECEIVE,
    data: feedData
  }
}

export const rssRequestFailure = (feedUrl, error) => {
  return {
    type: RSS_FAILURE,
    feedUrl: feedUrl,
    error: error
  }
}

export const fetchRssFeed = (feedUrl) => {
  return function (dispatch) {
    dispatch(rssRequest(feedUrl));

    return axios.get(feedUrl)
      .then((response) => {
        const data = parser.toJson(response.data, { object: true });
        dispatch(rssReceive(data));
      })
      .catch((error) => {
        dispatch(rssRequestFailure(feedUrl, error));
      });
  }
}
