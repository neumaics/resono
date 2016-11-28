import {
  RSS_REQUEST,
  RSS_RECEIVE,
  RSS_FAILURE,
  PODCAST_LOOKUP_REQUEST,
  PODCAST_LOOKUP_RECIEVE,
  PODCAST_LOOKUP_FAILURE
} from './types';
import axios from 'axios';
import parser from 'xml2json';
import _ from 'lodash';

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

function lookupRequest(id) {
  return {
    type: PODCAST_LOOKUP_REQUEST,
    id: id
  };
}

function lookupRecieve(data) {
  return {
    type: PODCAST_LOOKUP_RECIEVE,
    data: data
  };
}

function lookupFailure(error) {
  return {
    type: PODCAST_LOOKUP_FAILURE,
    error: error
  };
}

function lookupPodcastInfo(id) {
  return function (dispatch, getState) {
    const info = _.find(getState().search.results.toJS(), (o) => { return o.id == id; });

    if (info) {
      return Promise.resolve(dispatch(lookupRecieve(info)));
    } else {
      dispatch(lookupRequest(id));

      return (axios.get(`http://itunes.apple.com/lookup?id=${id}`)
        .then((response) => {
          if (_.has(response, 'data.results[0]')) {
            const item = response.data.results[0];
            dispatch(lookupRecieve({ id: item.collectionId, title: item.collectionName, feedUrl: item.feedUrl }));
          } else {
            dispatch(lookupFailure({ message: `podcast with id [${id}] not found`}));
          }
        })
        .catch((error) => {
          dispatch(lookupFailure(error));
        }));
    }
  };
}

export function getAllPodcastData(id) {
  return function (dispatch, getState) {
    dispatch(lookupPodcastInfo(id))
      .then(() => {
        const feedUrl = getState().detail.feedUrl;

        return dispatch(fetchRssFeed(id, feedUrl));
      });
  };
}
