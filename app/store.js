import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import statePersistence from './middleware/save-state';
import createConfigMiddleware from './middleware/config';

import { watchFile } from 'fs';
import { readFileSync } from 'jsonfile';

import reducers from './reducers';

const middleware = [
  thunkMiddleware,
  createConfigMiddleware(readFileSync, watchFile, { path: './app/config.json' }),
  statePersistence
];

export default createStore(reducers, applyMiddleware(...middleware));
