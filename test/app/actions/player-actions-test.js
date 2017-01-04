import expect from 'expect';
import * as actions from '../../../app/actions/player-actions';
import * as types from '../../../app/actions/types';

describe('player actions', () => {
  describe('changePodcast', () => {
    it('should create an action for changing the playing podcast', () => {
      const url = 'www.popularpodcast.com/latest.mp3';
      const expectedAction = {
        type: types.CHANGE_PODCAST,
        url: url
      };

      expect(actions.changePodcast(url)).toEqual(expectedAction);
    });
  });

  describe('playPodcast', () => {
    it('should create an action to start playing', () => {
      const expectedAction = {
        type: types.PLAY_PODCAST,
        status: types.statusTypes.PLAYING
      };

      expect(actions.playPodcast()).toEqual(expectedAction);
    });
  });

  describe('pausePodcast', () => {
    it('should create an action to pause playing', () => {
      const expectedAction = {
        type: types.PAUSE_PODCAST,
        status: types.statusTypes.PAUSED
      };

      expect(actions.pausePodcast()).toEqual(expectedAction);
    });
  });

  describe('stopPodcast', () => {
    it('should create an action to stop playing', () => {
      const expectedAction = {
        type: types.STOP_PODCAST,
        status: types.statusTypes.STOPPED
      };

      expect(actions.stopPodcast()).toEqual(expectedAction);
    });
  });
});
