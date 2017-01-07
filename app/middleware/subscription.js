import {
  SUBSCRIBE,
  UNSUBSCRIBE,
  UPDATE_COMPLETE
} from '../actions/types';
import { subscriptionsLoaded } from '../actions/subscription-actions';
import Immutable from 'immutable';

const subscriptionActions = Immutable.Set([
  SUBSCRIBE, UNSUBSCRIBE, UPDATE_COMPLETE
]);

export default function createFileMiddleware(readFile, writeFile, options = {}) {
  const path = options.path || './app/subscriptions.json';

  return (store) => {
    connect(readFile, store, path);

    return (next) => (action) => {
      const result = next(action);

      if (subscriptionActions.has(action.type)) {
        const subscriptions = store.getState().subscriptions.toJS();
        writeFile(path, subscriptions, { spaces: 2 });
      }

      return result;
    };
  };
}

function connect(readFile, store, path) {
  store.dispatch(subscriptionsLoaded(Immutable.fromJS(readFile(path))));
}
