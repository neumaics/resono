import expect from 'expect';
import * as actions from '../../../app/actions/playlist-actions';
import * as types from '../../../app/actions/types';
import Immutable from 'immutable';

const episodes = Immutable.List();

describe('playlist actions', () => {
  describe('toggleSort', () => {
    it('should create an action to toggle the sort order', () => {
      const expectedAction = {
        type: types.TOGGLE_SORT_ORDER
      };

      expect(actions.toggleSort()).toEqual(expectedAction);
    });
  });

  describe('nextEpisode', () => {
    it('should create an action to move to the next episode',  () => {
      const expectedAction = {
        type: types.NEXT_EPISODE,
        current: '1',
        episodes: episodes
      };

      expect(actions.nextEpisode('1', episodes)).toEqual(expectedAction);
    });
  });

  describe('prevEpisode', () => {
    it('should create an action to move to the previous episode', () => {
      const expectedAction = {
        type: types.PREV_EPISODE,
        current: '2',
        episodes: episodes
      };

      expect(actions.prevEpisode('2', episodes)).toEqual(expectedAction);
    });
  });

  describe('playEpisode', () => {
    it('should create an action to play the specified episode', () => {
      const expectedAction = {
        type: types.PLAY_EPISODE,
        episodeId: '3'
      };

      expect(actions.playEpisode('3')).toEqual(expectedAction);
    });
  });
});
