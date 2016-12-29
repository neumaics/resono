import expect from 'expect';
import * as reducers from '../../../app/reducers/search-reducer';
import * as actions from '../../../app/actions/types';
import Immutable from 'immutable';

describe('search reducer', () => {
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

  describe('isFetching', () => {
    it('should return an initial state', () => {
      expect(reducers.isFetching(undefined, {})).toEqual(false);
    });

    it('should handle PODCASTS_REQUEST action', () => {
      const currentState = false;
      const action = {
        type: actions.PODCASTS_REQUEST
      };

      expect(reducers.isFetching(currentState, action)).toEqual(true);
    });

    it('should handle PODCASTS_RECIEVE action', () => {
      const currentState = true;
      const action = {
        type: actions.PODCASTS_RECEIVE
      };

      expect(reducers.isFetching(currentState, action)).toEqual(false);
    });

    it('should handle PODCASTS_FAILURE action', () => {
      const currentState = true;
      const action = {
        type: actions.PODCASTS_FAILURE
      };

      expect(reducers.isFetching(currentState, action)).toEqual(false);
    });

    it('should return the previous state for any other action', () => {
      const currentState = true;
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE'
      };

      expect(reducers.isFetching(currentState, action)).toEqual(true);
    });
  });

  describe('results', () => {
    it('should return an initial state', () => {
      const initialState = Immutable.List();

      expect(reducers.results(undefined, {})).toEqual(initialState);
    });

    it('should handle the PODCASTS_RECEIVE action', () => {
      const podcasts = [{ title: 'got this' }];
      const action = {
        type: actions.PODCASTS_RECEIVE,
        podcasts: podcasts
      };

      const expectedState = Immutable.List(podcasts);

      expect(reducers.results(undefined, action)).toEqual(expectedState);
    });

    it('should handle the PODCASTS_FAILURE action', () => {
      const currentState = Immutable.List([{ title: 'got this' }]);
      const action = {
        type: actions.PODCASTS_FAILURE,
      };

      expect(reducers.results(currentState, action)).toEqual(currentState);
    });

    it('should return the previous state for any other action', () => {
      const currentState = Immutable.fromJS([{ title: 'already here' }]);

      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'all the things'
      };

      expect(reducers.results(currentState, action)).toEqual(currentState);
    });
  });
});
