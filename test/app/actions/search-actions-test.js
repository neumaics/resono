import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import Immutable from 'immutable';

import sampleItunesResponse from '../../data/itunes-response.json';
import * as actions from '../../../app/actions/search-actions';
import * as types from '../../../app/actions/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('search actions', () => {
  describe('podcastsRequest', () => {
    it('should create an action for initiating podcast queries', () => {
      const query = 'this am';
      const expectedAction = {
        type: types.PODCASTS_REQUEST,
        query: query
      };

      expect(actions.podcastsRequest(query)).toEqual(expectedAction);
    });
  });

  describe('podcastsReceive', () => {
    it('should create an action for receiving podcast search results', () => {
      const query = 'planet m';
      const json = [{ title: 'planet money' }];

      const expectedAction = {
        type: types.PODCASTS_RECEIVE,
        query: query,
        podcasts: json
      };

      expect(actions.podcastsReceive(query, json)).toEqual(expectedAction);
    });
  });

  describe('podcastsRequestFailure', () => {
    it('should create an action to notify of podcast search failures', () => {
      const query = 'very fail';
      const error = 'error = very yes';

      const expectedAction = {
        type: types.PODCASTS_FAILURE,
        query: query,
        error: error
      };

      expect(actions.podcastsRequestFailure(query, error)).toEqual(expectedAction);
    });
  });

  describe('fetchPodcasts', () => {
    const mockSearchEndpoint = 'http://podcast.rss/search';
    const config = Immutable.fromJS({ itunes: { searchEndpoint: mockSearchEndpoint }});

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create actions to organize itunes api requests', () => {
      const store = mockStore({ config: config });

      nock('http://podcast.rss')
        .get('/search')
        .query({
          term: 'this am',
          media: 'podcast',
          entity: 'podcast'
        })
        .reply(200, sampleItunesResponse);

      const podcasts = [{
        id: 201671138,
        title: 'This American Life',
        feedUrl: 'http://feed.thisamericanlife.org/talpodcast',
        item: sampleItunesResponse.results[0]
      }, {
        id: 917918570,
        title: 'Serial',
        feedUrl: 'http://feeds.serialpodcast.org/serialpodcast',
        item: sampleItunesResponse.results[1]
      }];

      const query = 'this am';
      const expectedActions = [
        { type: types.PODCASTS_REQUEST, query: query },
        { type: types.PODCASTS_RECEIVE, query: query, podcasts: podcasts }
      ];

      return store.dispatch(actions.fetchPodcasts('this am'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create actions for api request failures', () => {
      const store = mockStore({ config: config });
      const query = 'star trekkin\'';
      const error = { message: 'no can do, bub' };

      nock('http://podcast.rss')
        .get('/search')
        .query({
          term: query,
          media: 'podcast',
          entity: 'podcast'
        })
        .replyWithError(error);

      const expectedActions = [
        { type: types.PODCASTS_REQUEST, query: query },
        { type: types.PODCASTS_FAILURE, query: query, error: error }
      ];

      return store.dispatch(actions.fetchPodcasts(query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
