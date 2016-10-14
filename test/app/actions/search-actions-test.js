import configureMockStore from 'redux-mock-store'
import expect from 'expect'
import thunk from 'redux-thunk'
import nock from 'nock'
import Immutable from 'immutable'

import sampleItunesResponse from '../../data/itunes-response.json'
import * as actions from '../../../app/actions/search-actions'
import * as types from '../../../app/actions/types'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('search actions', () => {
  it('should create an action for searching for podcasts', () => {
    const query = 'freq eq';
    const expectedAction = {
      type: types.SEARCH_PODCASTS,
      query: query
    };

    expect(actions.searchPodcasts(query)).toEqual(expectedAction);
  });

  it('should create an action for initiating podcast queries', () => {
    const query = 'this am';
    const expectedAction = {
      type: types.PODCASTS_REQUEST,
      query: query
    };

    expect(actions.podcastsRequest(query)).toEqual(expectedAction);
  });

  it('should create an action for podcasts receiving podcast search results', () => {
    const query = 'planet m';
    const json = [{ title: 'planet money' }];

    const expectedAction = {
      type: types.PODCASTS_RECEIVE,
      query: query,
      podcasts: json
    };

    expect(actions.podcastsReceive(query, json)).toEqual(expectedAction);
  });

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

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create actions to organize itunes api requests', () => {
      nock('https://itunes.apple.com/')
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
        feedUrl: 'http://feed.thisamericanlife.org/talpodcast'
      }, {
        id: 917918570,
        title: 'Serial',
        feedUrl: 'http://feeds.serialpodcast.org/serialpodcast'
      }];

      const query = 'this am';
      const expectedActions = [
        { type: types.PODCASTS_REQUEST, query: query },
        { type: types.PODCASTS_RECEIVE, query: query, podcasts: podcasts }
      ];

      const store = mockStore(Immutable.fromJS({ query: 'this', podcasts: [] }));

      return store.dispatch(actions.fetchPodcasts('this am'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create actions for api request failures', () => {
      const query = 'star trekkin\'';
      const error = { message: 'no can do, bub' };

      nock('https://itunes.apple.com/')
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

        const store = mockStore(Immutable.fromJS({ query: 'this', podcasts: [] }));

        return store.dispatch(actions.fetchPodcasts(query))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
  });
});
