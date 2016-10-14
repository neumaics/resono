import {
  SEARCH_PODCASTS,
  PODCASTS_REQUEST,
  PODCASTS_RECEIVE,
  PODCASTS_FAILURE,
  PODCASTS_DETAIL_REQUEST,
  PODCASTS_DETAIL_RECEIVE
} from './types'
import axios from 'axios'
import uuid from 'uuid'

export function searchPodcasts(query) {
  return { type: SEARCH_PODCASTS, query: query }
}

export function podcastsRequest(query) {
  return { type: PODCASTS_REQUEST, query: query }
}

export function podcastsReceive(query, json) {
  return {
    type: PODCASTS_RECEIVE,
    query: query,
    podcasts: json
  }
}

export function podcastsRequestFailure(query, error) {
  return {
    type: PODCASTS_FAILURE,
    query: query,
    error: error
  }
}

export function fetchPodcasts(query) {
  return function (dispatch) {
    dispatch(podcastsRequest(query));

    const params = {
      term: query,
      media: 'podcast',
      entity: 'podcast'
    };

    return axios.get('https://itunes.apple.com/search', { params })
      .then((response) => {
        return response.data.results.map((item) => {
          return { id: item.collectionId, title: item.collectionName, feedUrl: item.feedUrl };
        });
      })
      .then((results) => {
        dispatch(podcastsReceive(query, results))
      })
      .catch((error) => {
        dispatch(podcastsRequestFailure(query, error));
      });
  }
}

export function requestPodcastDetail(podcastId) {
  return {
    type: PODCASTS_DETAIL_REQUEST,
    id: podcastId
  }
}

export function receivePodcastDetail(details) {
  return {
    type: PODCASTS_DETAIL_RECEIVE,
    podcast: details
  }
}
