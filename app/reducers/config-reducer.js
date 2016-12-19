import { CONFIG_CHANGED, CONFIG_LOADED } from '../actions/types';
import Immutable from 'immutable';

const initialState = Immutable.Map().set('isLoaded', false);

export function config(state = initialState, action) {
  switch (action.type) {
    case CONFIG_CHANGED: {
      return state.merge(action.config);
    }
    case CONFIG_LOADED: {
      return Immutable.fromJS(action.config).set('isLoaded', true);
    }
    default: {
      return state;
    }
  }
}
