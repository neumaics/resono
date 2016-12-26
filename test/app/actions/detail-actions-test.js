import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import Immutable from 'immutable';

import * as actions from '../../../app/actions/detail-actions';
import * as types from '../../../app/actions/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('detail actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchRssFeed', () => {
    it('should create actions to organize rss feed detail requests', () => {
      const feedUrl = 'https://feed.rss/';
      const id = 6;

      nock(feedUrl)
        .get('/')
        .reply(200, '<?xml version="1.0" encoding="UTF-8"?><rss>yep</rss>');

      const data = { rss: 'yep' };
      const expectedActions = [
        { type: types.RSS_REQUEST, feedUrl: feedUrl },
        { type: types.RSS_RECEIVE, id: id, data: data.rss }
      ];

      const store = mockStore(Immutable.fromJS({ query: 'this', podcasts: [] }));

      return store.dispatch(actions.fetchRssFeed(id, feedUrl)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should create actions for api request failures', () => {
      const feedUrl = 'https://nothing-here.rss/';
      const error = { message: 'hah, nice try' };
      const id = 7;

      nock(feedUrl)
        .get('/')
        .replyWithError(error);

      const expectedActions = [
        { type: types.RSS_REQUEST, feedUrl: feedUrl },
        { type: types.RSS_FAILURE, feedUrl: feedUrl, error: error }
      ];

      const store = mockStore(Immutable.fromJS({ query: 'this', podcasts: [] }));

      return store.dispatch(actions.fetchRssFeed(id, feedUrl)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
