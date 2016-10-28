import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import statePersistence from './middleware/save-state';

import reducers from './reducers';

const middleware = [
  thunkMiddleware,
  statePersistence
];

export default createStore(reducers, applyMiddleware(...middleware));
