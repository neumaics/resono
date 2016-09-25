import { combineReducers } from 'redux';
import podcastSearch from './podcast-search-reducer'

const app = combineReducers({
  podcastSearch
})

export default app;
