import { SEARCH_PODCASTS } from './types';

export const searchPodcasts = (query) => {
  return { type: SEARCH_PODCASTS, query: query }
}
