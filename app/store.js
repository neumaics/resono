import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createConfigMiddleware from './middleware/config';
import createFileMiddleware from './middleware/subscription';

import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';

import { watchFile } from 'fs';
import { readFileSync, writeFileSync } from 'jsonfile';

import reducers from './reducers';

const reducer = storage.reducer(reducers);
const engine = filter(createEngine('podcast-player'), ['player', ['search', ['query']]], [['player', 'status']]);

const middleware = [
  thunkMiddleware,
  createConfigMiddleware(readFileSync, watchFile, { path: './app/config.json' }),
  createFileMiddleware(readFileSync, writeFileSync, { path: './app/subscriptions.json' }),
  storage.createMiddleware(engine)
];

const store = createStore(reducer, applyMiddleware(...middleware));
export default store;

const load = storage.createLoader(engine);
load(store)
  .then((newState) => console.log('Loaded state:', newState))
  .catch(() => console.log('Failed to load previous state'));
