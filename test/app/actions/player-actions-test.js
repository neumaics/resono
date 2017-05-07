import expect from 'expect';
import * as actions from '../../../app/actions/player-actions';
import * as types from '../../../app/actions/types';

describe('player actions', () => {
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

  describe('changePosition', () => {
    it('should create an action to change the currently playing position', () => {
      const newPosition = 0.4;
      const expectedAction = {
        type: types.CHANGE_POSITION,
        position: newPosition
      };

      expect(actions.changePosition(newPosition)).toEqual(expectedAction);
    });
  });

  describe('changeLength', () => {
    it('should create an action to change the length of the playing episode', () => {
      const newLength = 4.0;
      const expectedAction = {
        type: types.CHANGE_LENGTH,
        length: newLength
      };

      expect(actions.changeLength(newLength)).toEqual(expectedAction);
    });
  });

  describe('changeBytesTotal', () => {
    it('should create an action that changes the size of the playing episode', () => {
      const newSize = 3.0;
      const expectedAction = {
        type: types.CHANGE_BYTES_TOTAL,
        bytesTotal: newSize
      };

      expect(actions.changeBytesTotal(newSize)).toEqual(expectedAction);
    });
  });

  describe('changeBytesLoaded', () => {
    it('should create an action that changes the size of the playing episode', () => {
      const newSize = 1.0;
      const expectedAction = {
        type: types.CHANGE_BYTES_LOADED,
        bytesLoaded: newSize
      };

      expect(actions.changeBytesLoaded(newSize)).toEqual(expectedAction);
    });
  });

  describe('changeVolume', () => {
    it('should create an action to change the volume of the player', () => {
      const newVolume = 20.0;
      const expectedAction = {
        type: types.CHANGE_VOLUME,
        volume: newVolume
      };

      expect(actions.changeVolume(newVolume)).toEqual(expectedAction);

    });
  });
});
