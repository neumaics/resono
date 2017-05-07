import expect from 'expect';
import * as reducers from '../../../app/reducers/playlist-reducer';
import * as actions from '../../../app/actions/types';
import Immutable from 'immutable';

const episodes = Immutable.fromJS([
  { id: '1' },
  { id: '2' },
  { id: '3' }
]);

describe('playlist reducer', () => {
  describe('sort', () => {
    it('should return an initial state', () => {
      const expected = actions.orderTypes.ASCENDING;
      const actual = reducers.playlist(undefined, {}).sort;

      expect(actual).toEqual(expected);
    });

    it('should handle the TOGGLE_SORT_ORDER event', () => {
      const currentState = {
        sort: actions.orderTypes.ASCENDING,
        current: 'some_id'
      };
      const action = { type: actions.TOGGLE_SORT_ORDER };
      const expected = actions.orderTypes.DESCENDING;
      const actual = reducers.playlist(currentState, action).sort;

      expect(actual).toEqual(expected);
    });

    it('should return the previous state for any other action', () => {
      const currentState = {
        sort: actions.orderTypes.DESCENDING,
        current: 'some_id'
      };
      const action = { type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE' };
      const actual = reducers.playlist(currentState, action).sort;
      const expected = actions.orderTypes.DESCENDING;

      expect(actual).toEqual(expected);
    });
  });

  describe('current', () => {
    it('should return an initial state', () => {
      const expected = '';
      const actual = reducers.playlist(undefined, {}).current;

      expect(actual).toEqual(expected);
    });

    it('should handle the NEXT_EPISODE event by returning the next episod\'s id', () => {
      const action = {
        type: actions.NEXT_EPISODE,
        current: '1',
        episodes: episodes
      };
      const actual = reducers.playlist(undefined, action).current;
      const expected = '2';

      expect(actual).toEqual(expected);
    });

    it('should handle the PREV_EPISODE event by returning the previous episode\'s id', () => {
      const action = {
        type: actions.PREV_EPISODE,
        current: '2',
        episodes: episodes
      };
      const actual = reducers.playlist(undefined, action).current;
      const expected = '1';

      expect(actual).toEqual(expected);
    });

    it('should handle the PLAY_EPISODE event by returning the given episode\'s id', () => {
      const action = {
        type: actions.PLAY_EPISODE,
        episodeId: '2'
      };
      const actual = reducers.playlist(undefined, action).current;
      const expected = '2';

      expect(actual).toEqual(expected);
    });

    it('should return the previous state for any other action', () => {
      const currentState = {
        sort: actions.orderTypes.DESCENDING,
        current: 'some_id'
      };
      const action = { type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE' };
      const actual = reducers.playlist(currentState, action).current;
      const expected = currentState.current;

      expect(actual).toEqual(expected);
    });
  });

  describe('getCurrentIndex', () => {
    it('should return the current index of the given episode id in the episode list', () => {
      const currentId = '2';
      const actual = reducers.getCurrentIndex(currentId, episodes);
      const expected = 1;

      expect(actual).toEqual(expected);
    });

    it('should return -1 if the currentId isn\'t found', () => {
      const currentId = 'a';
      const actual = reducers.getCurrentIndex(currentId, episodes);
      const expected = -1;

      expect(actual).toEqual(expected);
    });

    describe('when the episode list is invalid', () => {
      it('should return -1 if the episode list is empty', () => {
        const currentId = '1';
        const actual = reducers.getCurrentIndex(currentId, Immutable.List());
        const expected = -1;

        expect(actual).toEqual(expected);
      });

      it('should return -1 if the episode list is null', () => {
        const currentId = '1';
        const actual = reducers.getCurrentIndex(currentId, null);
        const expected = -1;

        expect(actual).toEqual(expected);
      });

      it('should return -1 if the episode list is undefined', () => {
        const currentId = '1';
        const actual = reducers.getCurrentIndex(currentId);
        const expected = -1;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getNext', () => {
    it('should get the next episode in the episode list', () => {
      const currentId = '1';
      const actual = reducers.getNext(currentId, episodes);
      const expected = '2';

      expect(actual).toEqual(expected);
    });

    it('should wrap around when getting past the last episode', () => {
      const currentId = '3';
      const actual = reducers.getNext(currentId, episodes);
      const expected = '1';

      expect(actual).toEqual(expected);
    });

    it('should return null if the episode list is invalid', () => {
      const currentId = '1';
      const actual = reducers.getNext(currentId);

      expect(actual).toEqual(null);
    });

    it('should return null if the current episode isn\'t found', () => {
      const currentId = 'cannot_find_me';
      const actual = reducers.getNext(currentId, episodes);

      expect(actual).toEqual(null);
    });
  });

  describe('getPrevious', () => {
    it('should get the previous episode in the episode list', () => {
      const currentId = '3';
      const actual = reducers.getPrevious(currentId, episodes);
      const expected = '2';

      expect(actual).toEqual(expected);
    });

    it('should wrap around when getting past the first episode', () => {
      const currentId = '1';
      const actual = reducers.getPrevious(currentId, episodes);
      const expected = '3';

      expect(actual).toEqual(expected);
    });

    it('should return null if the episode list is invalid', () => {
      const currentId = '1';
      const actual = reducers.getPrevious(currentId);

      expect(actual).toEqual(null);
    });

    it('should return null if the current episode isn\'t found', () => {
      const currentId = 'cannot_find_me';
      const actual = reducers.getPrevious(currentId, episodes);

      expect(actual).toEqual(null);
    });
  });
});
