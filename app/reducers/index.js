import { combineReducers } from 'redux'
import { podcastSearch, query } from './search-reducer'
import { isFetchingRss, detailErrors, detail } from './detail-reducer'
import { player } from './player-reducer'

const app = combineReducers({
  podcastSearch,
  query,
  detail,
  isFetchingRss,
  detailErrors,
  player
});

export default app;
