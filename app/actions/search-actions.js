import {
  PODCASTS_REQUEST,
  PODCASTS_RECEIVE,
  PODCASTS_FAILURE
} from './types';
import axios from 'axios';

export function podcastsRequest(query) {
  return {
    type: PODCASTS_REQUEST,
    query: query
  };
}

export function podcastsReceive(query, json) {
  return {
    type: PODCASTS_RECEIVE,
    query: query,
    podcasts: json
  };
}

export function podcastsRequestFailure(query, error) {
  return {
    type: PODCASTS_FAILURE,
    query: query,
    error: error
  };
}

export function fetchPodcasts(query) {
  return function (dispatch, getState) {
    const config = getState().config.get('itunes').toJS();

    dispatch(podcastsRequest(query));

    const params = {
      term: query,
      media: 'podcast',
      entity: 'podcast'
    };

    return axios.get(config.searchEndpoint, { params })
      .then((response) => {
        return response.data.results.map((item) => {
          // TODO: Remove 'item' from return object
          return { id: item.collectionId, title: item.collectionName, feedUrl: item.feedUrl, item };
        });
      })
      .then((results) => {
        dispatch(podcastsReceive(query, results));
      })
      .catch((error) => {
        dispatch(podcastsRequestFailure(query, error));
      });
  };
}
