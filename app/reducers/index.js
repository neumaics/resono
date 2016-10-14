import { combineReducers } from 'redux'
import { podcastSearch, query } from './search-reducer'
import { isFetchingRss, detailErrors, detail } from './detail-reducer'
import Immutable from 'immutable'

const app = combineReducers({
  podcastSearch,
  query,
  detail,
  isFetchingRss,
  detailErrors
});

export default app;
