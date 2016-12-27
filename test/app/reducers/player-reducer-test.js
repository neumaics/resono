import expect from 'expect'
import * as reducers from '../../../app/reducers/player-reducer'
import * as actions from '../../../app/actions/types'
import Immutable from 'immutable'

describe('player reducer', () => {
  describe('status', () => {
    it('should return an initial state', () => {
      const expected = actions.statusTypes.STOPPED;
      const actual = reducers.player(undefined, {}).status;

      expect(actual).toEqual(expected);
    });

    it('should handle the PLAY_PODCAST event', () => {
      const action = {
        type: actions.PLAY_PODCAST,
        status: actions.statusTypes.PLAYING
      };

      const expected = actions.statusTypes.PLAYING;
      const actual = reducers.player(undefined, action).status;

      expect(actual).toEqual(expected);
    });

    it('should handle the PAUSE_PODCAST event', () => {
      const action = {
        type: actions.PAUSE_PODCAST,
        status: actions.statusTypes.PAUSED
      };

      const expected = actions.statusTypes.PAUSED;
      const actual = reducers.player(undefined, action).status;

      expect(actual).toEqual(expected);
    });

    it('should handle the STOP_PODCAST event', () => {
      const action = {
        type: actions.STOP_PODCAST,
        status: actions.statusTypes.STOPPED
      };

      const expected = actions.statusTypes.STOPPED;
      const actual = reducers.player(undefined, action).status;

      expect(actual).toEqual(expected);
    });

    it('should return the previous state for any other action', () => {
      const currentState = {
        currentPodcast: 'JavaScript',
        status: actions.statusTypes.PLAYING
      };

      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'nothing useful'
      };
      const actual = reducers.player(currentState, action).status;

      expect(actual).toEqual(actions.statusTypes.PLAYING);
    });
  });

  describe('currentPodcast', () => {
    it('should return an initial state', () => {
      expect(reducers.player(undefined, {}).currentPodcast).toEqual('/');
    });

    it('should handle the CHANGE_PODCAST action', () => {
      const url = 'www.feed.rss/pocast.mp3';

      const action = {
        type: actions.CHANGE_PODCAST,
        url: url
      };

      const actual = reducers.player(undefined, action).currentPodcast;

      expect(actual).toEqual(url);
    });

    it('should return the previous state for any other action', () => {
      const currentState = {
        currentPodcast: 'get-ye-flask.mp3',
        status: actions.statusTypes.PAUSED
      };

      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE',
        payload: 'ye flask'
      };
      const actual = reducers.player(currentState, action).currentPodcast;

      expect(actual).toEqual(currentState.currentPodcast);
    });
  });
});
