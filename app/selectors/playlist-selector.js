import { createSelector } from 'reselect';

const getSubscriptions = (state) => state.subscriptions;
const getSort = (state) => state.playlist.sort;

const inputs = [
  getSubscriptions,
  getSort
];

const playlistSelector = (subscriptions, sort) => {
  const ascending = sort === 'desc' ? -1 : 1;

  const episodes = subscriptions
    .valueSeq()
    .map(p => { return [p.get('title'), p.get('episodes')]; })
    .flatMap((p) => {
      return p[1].map(e => {
        return e.set('podcast', p[0]);
      });
    })
    .sortBy((p) => { return ascending * p.get('pubDate'); });

  return episodes;
};

export const getPlayLists = createSelector(inputs, playlistSelector);
