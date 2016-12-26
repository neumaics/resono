import expect from 'expect';
import Immutable from 'immutable';
import * as actions from '../../../app/actions/config-actions';
import * as types from '../../../app/actions/types';


describe('config actions', () => {
  it('should provide an action for when the config changes', () => {
    const config = Immutable.fromJS({ url: 'http://url.net' });

    const expectedAction = {
      type: types.CONFIG_CHANGED,
      config: config
    };

    expect(actions.configChanged(config)).toEqual(expectedAction);
  });

  it('should provide an action for when the config is first loaded', () => {
    const config = Immutable.fromJS({ url: 'http://url.net' });

    const expectedAction = {
      type: types.CONFIG_LOADED,
      config: config
    };

    expect(actions.configLoaded(config)).toEqual(expectedAction);
  });
});
