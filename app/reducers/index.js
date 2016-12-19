import { combineReducers } from 'redux';
import { config } from './config-reducer';
import { detail } from './detail-reducer';
import { player } from './player-reducer';
import { search } from './search-reducer';
import { subscriptions } from './subscriptions-reducer';

const app = combineReducers({
  config,
  detail,
  player,
  search,
  subscriptions
});

export default app;
