import expect from 'expect';
import * as reducers from '../../../app/reducers/player-reducer';
import * as actions from '../../../app/actions/types';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  status: actions.statusTypes.STOPPED,
  currentPodcast: 'www.feed.rss/1/pocast.mp3',
  position: 2.0,
  length: 4.0,
  bytesTotal: 1.0,
  bytesLoaded: 0.5
});

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

  describe('position', () => {
    it('should return an initial state at the begining', () => {
      expect(reducers.player(undefined, {}).position).toEqual(0);
    });

    it('should handle the CHANGE_POSITION action', () => {
      const newPosition = 0.4;
      const action = {
        type: actions.CHANGE_POSITION,
        position: newPosition
      };

      const actual = reducers.player(initialState.toJS(), action).position;
      expect(actual).toEqual(newPosition);
    });

    it('should handle the CHANGE_PODCAST action by resetting state', () => {
      const url = 'www.feed.rss/podcast.mp3';
      const action = {
        type: actions.CHANGE_PODCAST,
        url: url
      };

      const currentState = initialState.set('position', 0.4).toJS();
      const actual = reducers.player(currentState, action).position;

      expect(actual).toEqual(0.0);
    });

    it('should return the previous state for any other action', () => {
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE'
      };

      const currentState = initialState.set('position', 0.6).toJS();
      const actual = reducers.player(currentState, action).position;

      expect(actual).toEqual(currentState.position);
    });
  });

  describe('length', () => {
    it('should return an initial state', () => {
      expect(reducers.player(undefined, {}).length).toEqual(1.0);
    });

    it('should handle the CHANGE_LENGTH action', () => {
      const newLength = 4000.00;
      const action = {
        type: actions.CHANGE_LENGTH,
        length: newLength
      };

      const actual = reducers.player(initialState.toJS(), action).length;
      expect(actual).toEqual(newLength);
    });

    it('should handle the CHANGE_PODCAST action by resetting state', () => {
      const url = 'www.feed.rss/podcast.mp3';
      const action = {
        type: actions.CHANGE_PODCAST,
        url: url
      };

      const currentState = initialState.set('length', 10000.0).toJS();
      const actual = reducers.player(currentState, action).length;

      expect(actual).toEqual(1.0);
    });

    it('should return previous state for any other action', () => {
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE'
      };

      const currentState = initialState.set('length', 2010.0).toJS();
      const actual = reducers.player(currentState, action).length;

      expect(actual).toEqual(currentState.length);
    });
  });

  describe('bytesTotal', () => {
    it('should return an initial state', () => {
      expect(reducers.player(undefined, {}).bytesTotal).toEqual(1.0);
    });

    it('should handle the CHANGE_BYTES_TOTAL action', () => {
      const newBytesTotal = 4000.00;
      const action = {
        type: actions.CHANGE_BYTES_TOTAL,
        bytesTotal: newBytesTotal
      };

      const actual = reducers.player(initialState.toJS(), action).bytesTotal;
      expect(actual).toEqual(newBytesTotal);
    });

    it('should handle the CHANGE_PODCAST action by resetting state', () => {
      const url = 'www.feed.rss/podcast.mp3';
      const action = {
        type: actions.CHANGE_PODCAST,
        url: url
      };

      const currentState = initialState.set('bytesTotal', 10030.0).toJS();
      const actual = reducers.player(currentState, action).bytesTotal;

      expect(actual).toEqual(1.0);
    });

    it('should return previous state for any other action', () => {
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE'
      };

      const currentState = initialState.set('bytesTotal', 2017.0).toJS();
      const actual = reducers.player(currentState, action).bytesTotal;

      expect(actual).toEqual(currentState.bytesTotal);
    });
  });

  describe('bytesLoaded', () => {
    it('should return an initial state', () => {
      expect(reducers.player(undefined, {}).bytesLoaded).toEqual(0.0);
    });

    it('should handle the CHANGE_BYTES_LOADED action', () => {
      const newBytesLoaded = 3999.00;
      const action = {
        type: actions.CHANGE_BYTES_LOADED,
        bytesLoaded: newBytesLoaded
      };

      const actual = reducers.player(initialState.toJS(), action).bytesLoaded;
      expect(actual).toEqual(newBytesLoaded);
    });

    it('should handle the CHANGE_PODCAST action by resetting state', () => {
      const url = 'www.feed.rss/podcast.mp3';
      const action = {
        type: actions.CHANGE_PODCAST,
        url: url
      };

      const currentState = initialState.set('bytesLoaded', 3999.0).toJS();
      const actual = reducers.player(currentState, action).bytesLoaded;

      expect(actual).toEqual(0.0);
    });

    it('should return previous state for any other action', () => {
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE'
      };

      const currentState = initialState.set('bytesLoaded', 2014.0).toJS();
      const actual = reducers.player(currentState, action).bytesLoaded;

      expect(actual).toEqual(currentState.bytesLoaded);
    });
  });

  describe('volume', () => {
    it('should return an initial state', () => {
      expect(reducers.player(undefined, {}).volume).toEqual(80);
    });

    it('should handle the CHANGE_VOLUME action', () => {
      const newVolume = 20.00;
      const action = {
        type: actions.CHANGE_VOLUME,
        volume: newVolume
      };

      const actual = reducers.player(initialState.toJS(), action).volume;
      expect(actual).toEqual(newVolume);
    });

    it('should return previous state for any other action', () => {
      const action = {
        type: 'FAKE_ACTION_DONT_IMPLEMENT_PLEASE'
      };

      const currentState = initialState.set('volume', 66.0).toJS();
      const actual = reducers.player(currentState, action).volume;

      expect(actual).toEqual(currentState.volume);
    });
  });
});
