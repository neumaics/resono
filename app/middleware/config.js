import { CONFIG_UPDATED } from '../actions/types';
import { configChanged, configLoaded } from '../actions/config-actions';


export default function createConfigMiddleware(readFile, writeFile, watchFile, options = {}) {
  const path = options.path || './app/config.js';

  return (store) => {
    setupConfig(readFile, watchFile, store, path);

    return (next) => (action) => {
      const result = next(action);

      if (action.type === CONFIG_UPDATED) {
        const config = store.getState().config.toJS();
        console.log(store.getState().config);
        writeFile(path, config, { spaces: 2 });
      }

      return result;
    };
  };
}

function setupConfig(readFile, watchFile, store, path) {
  store.dispatch(configLoaded(readFile(path)));

  watchFile(path, (eventType, fileName) => {
    if (fileName) {
      const contents = readFile(path);

      store.dispatch(configChanged(contents));
    }
  });
}
