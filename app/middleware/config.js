import { configChanged, configLoaded } from '../actions/config-actions';

export default function createConfigMiddleware(readFile, watchFile, options = {}) {
  const path = options.path || './app/config.js';

  return (store) => {
    setupConfig(readFile, watchFile, store, path);

    return (next) => (action) => {
      return next(action);
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
