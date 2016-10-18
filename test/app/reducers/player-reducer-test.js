import expect from 'expect'
import * as reducers from '../../../app/reducers/player-reducer'
import * as actions from '../../../app/actions/types'
import Immutable from 'immutable'

describe('player reducer', () => {
  const defaultState = Immutable.fromJS({
    status: actions.statusTypes.STOPPED
  });

  describe('currentPodcast', () => {
    it('should return an initial state', () => {
      expect(reducers.player(undefined, {})).toEqual(defaultState);
    });

    it('should handle the CHANGE_PODCAST action', () => {
      const mediaUrl = 'www.feed.rss/pocast.mp3';

      const action = {
        type: actions.CHANGE_PODCAST,
        mediaUrl: mediaUrl
      };

      const expectedState = Immutable.fromJS({
        status: actions.statusTypes.STOPPED,
        currentPodcast: mediaUrl
      });

      expect(reducers.player(defaultState, action)).toEqual(expectedState);
    });
  });
});
