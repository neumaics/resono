import { combineReducers } from 'redux';
import { podcastSearch, query } from './podcast-search-reducer';

const app = combineReducers({
  podcastSearch,
  query
});

export default app;
