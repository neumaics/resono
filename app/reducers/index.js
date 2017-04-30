import { combineReducers } from 'redux';
import { config } from './config-reducer';
import { player } from './player-reducer';
import { playlist } from './playlist-reducer';
import { search } from './search-reducer';
import { subscriptions } from './subscriptions-reducer';

const app = combineReducers({
  config,
  player,
  playlist,
  search,
  subscriptions
});

export default app;
