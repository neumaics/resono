import expect from 'expect'
import * as reducers from '../../../app/reducers/detail-reducer'
import * as actions from '../../../app/actions/types'
import Immutable from 'immutable'

describe('detail reducer', () => {
  describe('isFetchingRss', () => {
    it('should return an initial state', () => {
      expect(reducers.isFetchingRss(undefined, {})).toEqual(false);
    });

    it('should handle the RSS_REQUEST by setting state to true', () => {
      const feedUrl = 'www.feed.rss';
      const action = {
        type: actions.RSS_REQUEST,
        feedUrl: feedUrl
      };

      expect(reducers.isFetchingRss('', action)).toBe(true);
    });

    it('should handle the RSS_RECEIVE by setting state to false', () => {
      const action = {
        type: actions.RSS_RECEIVE,
        id: '123',
        data: { podcast: 'data' }
      };

      expect(reducers.isFetchingRss(true, action)).toBe(false);
    });

    it('should handle the RSS_FAILURE action by setting state to false', () => {
      const action = {
        type: actions.RSS_FAILURE,
        feedUrl: 'www.feed.rss',
        error: { message: 'that feed doesn\'t actually exist' }
      };

      expect(reducers.isFetchingRss(true, action)).toBe(false);
    });

    it('should return the previous state for any other action', () => {
      const currentState = false;
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'all the things'
      };

      expect(reducers.isFetchingRss(currentState, action)).toEqual(currentState);
    });
  });

  describe('detail', () => {
    it('should return an initial state', () => {
      const initialState = Immutable.fromJS({});

      expect(reducers.detail(undefined, {})).toEqual(initialState);
    });

    it('should handle the RSS_RECEIVE action', () => {
      const rssData = { stuff: 'here' };

      const expectedState = Immutable.fromJS({
        id: '1235',
        rss: Immutable.fromJS(rssData)
      });

      const action = {
        type: actions.RSS_RECEIVE,
        id: '1235',
        data: { rss: rssData }
      };

      expect(reducers.detail(undefined, action)).toEqual(expectedState);
    });

    it('should return the previous state for any other action', () => {
      const currentState = Immutable.fromJS({
        id: '123',
        rss: { channel: 'locutus' }
      });

      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'all the things'
      };

      expect(reducers.detail(currentState, action)).toEqual(currentState);
    });
  });

  describe('detailErrors', () => {
    it('should return an initial state', () => {
      const initialState = Immutable.fromJS({});

      expect(reducers.detail(undefined, {})).toEqual(initialState);
    });

    it('should handle the RSS_FAILURE action', () => {
      const error = { message: 'yeah, this doesn\'t actually exist' };

      const action = {
        type: actions.RSS_FAILURE,
        feedUrl: 'www.feed.rss',
        error: error
      };

      const expectedState = Immutable.fromJS({
        error: error
      });

      expect(reducers.detailErrors(undefined, action)).toEqual(expectedState);
    });

    it('should return the previous state for any other action', () => {
      const currentState = Immutable.fromJS({
        error: { message: 'hello' }
      });

      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'sommuh the things'
      };

      expect(reducers.detail(currentState, action)).toEqual(currentState);
    });
  });
});
