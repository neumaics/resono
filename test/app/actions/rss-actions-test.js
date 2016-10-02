import configureMockStore from 'redux-mock-store'
import expect from 'expect'
import thunk from 'redux-thunk'
import nock from 'nock'
import Immutable from 'immutable'

import sampleItunesResponse from '../../data/example-rss.json'
import * as actions from '../../../app/actions/rss-actions'
import * as types from '../../../app/actions/types'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('rss actions', () => {
  it('should create an action for initiating rss feed detail', () => {
    const feedUrl = 'www.feed.rss';
    const expectedAction = {
      type: types.RSS_REQUEST,
      feedUrl: feedUrl
    };

    expect(actions.rssRequest(feedUrl)).toEqual(expectedAction);
  });

  it('should create an action for receiving rss feed data', () => {
    const json = [{ title: 'planet money' }];

    const expectedAction = {
      type: types.RSS_RECEIVE,
      data: json
    };

    expect(actions.rssReceive(json)).toEqual(expectedAction);
  });

  it('should create an action to notify of podcast search failures', () => {
    const feedUrl = 'www.nothing-here.rss';
    const error = 'error = you better believe it';

    const expectedAction = {
      type: types.RSS_FAILURE,
      feedUrl: feedUrl,
      error: error
    };

    expect(actions.rssRequestFailure(feedUrl, error)).toEqual(expectedAction);
  });

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create actions to organize rss feed detail requests', () => {
      const feedUrl = 'https://feed.rss/';
      nock(feedUrl)
        .get('/')
        .reply(200, '<?xml version="1.0" encoding="UTF-8"?><rss>yep</rss>');

      const data = { rss: 'yep' };
      const expectedActions = [
        { type: types.RSS_REQUEST, feedUrl: feedUrl },
        { type: types.RSS_RECEIVE, data: data }
      ];

      const store = mockStore(Immutable.fromJS({ query: 'this', podcasts: [] }));

      return store.dispatch(actions.fetchRssFeed(feedUrl)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create actions for api request failures', () => {
      const feedUrl = 'https://nothing-here.rss/';
      const error = { message: 'hah, nice try' };

      nock(feedUrl)
        .get('/')
        .replyWithError(error);

        const expectedActions = [
          { type: types.RSS_REQUEST, feedUrl: feedUrl },
          { type: types.RSS_FAILURE, feedUrl: feedUrl, error: error }
        ];

        const store = mockStore(Immutable.fromJS({ query: 'this', podcasts: [] }));

        return store.dispatch(actions.fetchRssFeed(feedUrl)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
  });
});
