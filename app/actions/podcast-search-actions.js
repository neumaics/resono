import {
  SEARCH_PODCASTS, PODCASTS_REQUEST,
  PODCASTS_RECEIVE, PODCASTS_FAILURE
} from './types';
import axios from 'axios';
import uuid from 'uuid';

export const searchPodcasts = (query) => {
  return { type: SEARCH_PODCASTS, query: query }
}

export const podcastsRequest = (query) => {
  return { type: PODCASTS_REQUEST, query: query }
}

export const podcastsReceive = (query, json) => {
  return {
    type: PODCASTS_RECEIVE,
    query: query,
    podcasts: json
  }
}

export const podcastsRequestFailure = (query, error) => {
  return {
    type: PODCASTS_FAILURE,
    query: query,
    error: error
  }
}

export const fetchPodcasts = (query) => {
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
          return { id: item.artistId, title: item.artistName, feedUrl: item.feedUrl };
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
