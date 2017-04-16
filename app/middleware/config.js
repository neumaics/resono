import { CONFIG_CHANGED } from '../actions/types';
import { configLoaded } from '../actions/config-actions';

import Immutable from 'immutable';

const configActions = Immutable.Set([CONFIG_CHANGED]);

export default function createConfigMiddleware(readFile, writeFile, options = {}) {
  const path = options.path || './app/config.js';

  return (store) => {
    connect(readFile, store, path);

    return (next) => (action) => {
      const result = next(action);

      if (configActions.has(action.type)) {
        const config = store.getState().config.toJS();
        writeFile(path, config, { spaces: 2 });
      }

      return result;
    };
  };
}

function connect(readFile, store, path) {
  const contents = Immutable.fromJS(readFile(path));

  store.dispatch(configLoaded(contents));
}
