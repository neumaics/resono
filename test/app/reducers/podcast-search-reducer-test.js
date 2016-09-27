import expect from 'expect'
import * as reducers from '../../../app/reducers/podcast-search-reducer'
import * as actions from '../../../app/actions/types'
import Immutable from 'immutable'

describe('podcast search reducer', () => {
  describe('query', () => {
    it('should return an initial state', () => {
      expect(reducers.query(undefined, {})).toEqual('');
    });

    it('should handle the SEARCH_PODCASTS action', () => {
      const query = 'testing 123';
      const action = {
        type: actions.SEARCH_PODCASTS,
        query: query
      };

      expect(reducers.query('', action)).toEqual(query);
    });

    it('should return the previous state for any other action', () => {
      const currentState = 'sparkles';
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'all the things'
      };

      expect(reducers.query(currentState, action)).toEqual(currentState);
    });
  });

  describe('podcastSearch', () => {
    it('should return an initial state', () => {
      const initialState = Immutable.fromJS({
        fetching: false,
        podcasts: []
      });

      expect(reducers.podcastSearch(undefined, {})).toEqual(initialState);
    });

    it('should handle the PODCASTS_REQUEST action', () => {
      const action = {
        type: actions.PODCASTS_REQUEST
      }
      const expectedState = Immutable.fromJS({
        fetching: true,
        podcasts: []
      });

      expect(reducers.podcastSearch(undefined, action)).toEqual(expectedState);
    });

    it('should handle the PODCASTS_RECEIVE action', () => {
      const podcasts = [{ title: 'got this' }];
      const action = {
        type: actions.PODCASTS_RECEIVE,
        podcasts: podcasts
      };

      const expectedState = Immutable.fromJS({
        fetching: false,
        podcasts: podcasts
      });

      expect(reducers.podcastSearch(undefined, action)).toEqual(expectedState);
    });

    it('should handle the PODCASTS_FAILURE action', () => {
      const action = {
        type: actions.PODCASTS_FAILURE,
        query: 'broken',
        error: 'stuffs messed up, yo'
      };

      const expectedState = Immutable.fromJS({
        fetching: false,
        podcasts: []
      });

      expect(reducers.podcastSearch(undefined, action)).toEqual(expectedState);
    });

    it('should return the previous state for any other action', () => {
      const currentState = Immutable.fromJS({
        fetching: false,
        podcasts: [{ title: 'already here' }]
      });

      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'all the things'
      };

      expect(reducers.podcastSearch(currentState, action)).toEqual(currentState);
    });
  });
});
