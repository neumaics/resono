import { SEARCH_PODCASTS } from './types';

export function searchPodcasts(query) {
  console.log('searching for ', query);
  
  return { type: SEARCH_PODCASTS, query: query }
}
