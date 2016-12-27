import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createConfigMiddleware from './middleware/config';
import createFileMiddleware from './middleware/subscription';

import { watchFile } from 'fs';
import { readFileSync, writeFileSync } from 'jsonfile';

import reducers from './reducers';

const middleware = [
  thunkMiddleware,
  createConfigMiddleware(readFileSync, watchFile, { path: './app/config.json' }),
  createFileMiddleware(readFileSync, writeFileSync, { path: './app/subscriptions.json' })
];

export default createStore(reducers, applyMiddleware(...middleware));
