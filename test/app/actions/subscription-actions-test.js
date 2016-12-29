import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import Immutable from 'immutable';
import fs from 'fs';

import * as actions from '../../../app/actions/subscription-actions';
import * as types from '../../../app/actions/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const mockRssResponse = fs.readFileSync('./test/data/example-rss.xml', { encoding: 'utf8' });

describe('subscription actions', () => {
  describe('subscriptionLoaded', () => {
    it('should provide an action when the saved subscriptions are loaded', () => {
      const subscriptions = Immutable.Map();

      const expectedAction = {
        type: types.SUBSCRIPTIONS_LOADED,
        subscriptions: subscriptions
      };

      expect(actions.subscriptionsLoaded(subscriptions)).toEqual(expectedAction);
    });
  });

  describe('fetchAndSubscribe', () => {
    const mockRssFeedUrl = 'http://podcast.rss/feed/';
    const id = '201671138';
    const store = mockStore({});

    afterEach(() => {
      store.clearActions();
      nock.cleanAll();
    });

    it('should fetch podcast feed data and signal subscription to a podcast', () => {
      nock(mockRssFeedUrl)
        .get('/')
        .reply(200, mockRssResponse);

      // TODO: refactor, please.
      return store.dispatch(actions.fetchAndSubscribe(id, mockRssFeedUrl))
        .then(() => {
          const actions = store.getActions();

          const rssRequestAction = actions[0];
          expect(rssRequestAction).toEqual({ type: types.RSS_REQUEST, feedUrl: mockRssFeedUrl });

          const subscribeAction = actions[1];
          expect(subscribeAction.type).toEqual(types.SUBSCRIBE);
          expect(subscribeAction.podcast).toBeAn(Immutable.Map);
        });
    });

    it('should dispatch an action to notify of failures', () => {
      const error = { message: 'there was a problem' };

      nock(mockRssFeedUrl)
        .get('/')
        .replyWithError(error);

      return store.dispatch(actions.fetchAndSubscribe(id, mockRssFeedUrl))
        .then(() => {
          const actions = store.getActions();

          const rssRequestAction = actions[0];
          expect(rssRequestAction).toEqual({ type: types.RSS_REQUEST, feedUrl: mockRssFeedUrl });

          const rssRequestFailure = actions[1];
          expect(rssRequestFailure.type).toEqual(types.SUBSCRIBE_FAILURE);
          expect(rssRequestFailure.id).toEqual(id);
          expect(rssRequestFailure.error.message).toEqual(error.message);
        });
    });
  });

  describe('subscribe', () => {
    it('should provide an action for user subscribing', () => {
      const podcast = Immutable.Map({ id: "12345" });

      const expectedAction = {
        type: types.SUBSCRIBE,
        podcast: podcast
      };

      expect(actions.subscribe(podcast)).toEqual(expectedAction);
    });
  });

  describe('unsubscribe', () => {
    it('should provide an action for user unsubscribing', () => {
      const podcastId = '12345';

      const expectedAction = {
        type: types.UNSUBSCRIBE,
        id: podcastId
      };

      expect(actions.unsubscribe(podcastId)).toEqual(expectedAction);
    });
  });

  describe('subscribeFailure', () => {
    it('should provide an action for subscription failures', () => {
      const podcastId = '12345';
      const error = 'Podcast with id [12345] couldn\'t be subscribed';

      const expectedAction = {
        type: types.SUBSCRIBE_FAILURE,
        id: podcastId,
        error: error
      };

      expect(actions.subscribeFailure(podcastId, error)).toEqual(expectedAction);
    });
  });

  describe('updateRequest', () => {
    it('should provide an action for updating the podcast', () => {
      const podcastId = '54321';

      const expectedAction = {
        type: types.UPDATE_REQUEST,
        id: podcastId
      };

      expect(actions.updateRequest(podcastId)).toEqual(expectedAction);
    });
  });

  describe('updateComplete', () => {
    it('should provide an action when the update has been completed', () => {
      const podcast = Immutable.Map({ id: '54321' });

      const expectedAction = {
        type: types.UPDATE_COMPLETE,
        podcast: podcast
      };

      expect(actions.updateComplete(podcast)).toEqual(expectedAction);
    });
  });

  describe('updateError', () => {
    it('should provide an action for errors when updating a podcast', () => {
      const id = '54321';
      const error = 'Something bad happened';

      const expectedAction = {
        type: types.UPDATE_ERROR,
        id: id,
        error: error
      };

      expect(actions.updateError(id, error)).toEqual(expectedAction);
    });
  });

  describe('updateSubscription', () => {
    const mockRssFeedUrl = 'http://podcast.rss/feed/';
    const id = '201671138';
    const store = mockStore({
      subscriptions: Immutable.fromJS({ '201671138': { feedUrl: mockRssFeedUrl } })
    });

    afterEach(() => {
      store.clearActions();
      nock.cleanAll();
    });

    it('should fetch podcast feed data and signal subscription to a podcast', () => {
      nock(mockRssFeedUrl)
        .get('/')
        .reply(200, mockRssResponse);

      return store.dispatch(actions.updateSubscription(id))
        .then(() => {
          const actions = store.getActions();

          const rssRequestAction = actions[0];
          expect(rssRequestAction).toEqual({ type: types.UPDATE_REQUEST, id: id });

          const subscribeAction = actions[1];
          expect(subscribeAction.type).toEqual(types.UPDATE_COMPLETE);
          expect(subscribeAction.podcast).toBeAn(Immutable.Map);
        });
    });

    it('should dispatch an action to notify of failures', () => {
      const error = { message: 'there was a problem' };

      nock(mockRssFeedUrl)
        .get('/')
        .replyWithError(error);

      return store.dispatch(actions.updateSubscription(id))
        .then(() => {
          const actions = store.getActions();

          const rssRequestAction = actions[0];
          expect(rssRequestAction).toEqual({ type: types.UPDATE_REQUEST, id: id });

          const rssRequestFailure = actions[1];
          expect(rssRequestFailure.type).toEqual(types.UPDATE_ERROR);
          expect(rssRequestFailure.id).toEqual(id);
          expect(rssRequestFailure.error.message).toEqual(error.message);
        });
    });
  });

  describe('rssRequest', () => {
    it('should provide an action for requesting rss feed data', () => {
      const url = 'https://url.podcast.rss/feed';

      const expectedAction = {
        type: types.RSS_REQUEST,
        feedUrl: url
      };

      expect(actions.rssRequest(url)).toEqual(expectedAction);
    });
  });

  describe('rssReceive', () => {
    it('should provide an action for receiving the rss feed data', () => {
      const id = '12345';
      const data = { rss: 'abd' };

      const expectedAction = {
        type: types.RSS_RECEIVE,
        id: id,
        data: data
      };

      expect(actions.rssReceive(id, data)).toEqual(expectedAction);
    });
  });

  describe('rssRequestFailure', () => {
    it('should provide an action for signaling errors getting rss feed data', () => {
      const url = 'https://url.podcast.rss/feed';
      const error = { message: 'something happened' };

      const expectedAction = {
        type: types.RSS_FAILURE,
        feedUrl: url,
        error: error
      };

      expect(actions.rssRequestFailure(url, error)).toEqual(expectedAction);
    });
  });
});
