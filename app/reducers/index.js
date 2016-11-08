import { combineReducers } from 'redux';
import { search } from './search-reducer';
import { detail } from './detail-reducer';
import { player } from './player-reducer';
import { subscriptions } from './subscriptions-reducer';

const app = combineReducers({
  search,
  detail,
  player,
  subscriptions
});

export default app;
