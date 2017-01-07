import { CONFIG_CHANGED, CONFIG_LOADED } from '../actions/types';
import Immutable from 'immutable';

const initialState = Immutable.Map({ isLoaded: false});

export function config(state = initialState, action) {
  switch (action.type) {
    case CONFIG_CHANGED: {
      return state.merge(action.config);
    }
    case CONFIG_LOADED: {
      return action.config.set('isLoaded', true);
    }
    default: {
      return state;
    }
  }
}
