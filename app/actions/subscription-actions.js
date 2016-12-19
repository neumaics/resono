import {
  FETCH_SUBSCRIPTIONS,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SUBSCRIBE_FAILURE
} from './types';
import { fetchRssFeed } from './detail-actions';
import Loki from 'lokijs';
import _ from 'lodash';

// TODO: inject this dependency on loki
const dbOpts = {
  autosave: true,
  autosaveInterval: 2000,
  autoload: true,
};

const db = new Loki('subscriptions.json', dbOpts);
const podcasts = db.getCollection('podcasts') || db.addCollection('podcasts', { indices: [ 'id' ]});

export function subscribeAndSave(id, feedUrl) {
  return function (dispatch) {
    return dispatch(fetchRssFeed(id, feedUrl))
      .then((detail) => {
        podcasts.insert({ id, feedUrl, detail });

        dispatch(subscribe(id, feedUrl, detail));
      })
      .catch((err) => {
        console.log(err);
        dispatch(subscribeFailure(id));
      });
  };
}

export function subscribe(id, feedUrl, detail) {
  return {
    type: SUBSCRIBE,
    id: id,
    feedUrl: feedUrl,
    detail: detail
  };
}

export function unsubscribe(id) {
  return {
    type: UNSUBSCRIBE,
    id: id
  };
}

export function subscribeFailure(id) {
  return {
    type: SUBSCRIBE_FAILURE,
    id: id,
    message: `Podcast with id [${id}] has already been subscribed`
  };
}

export function fetchSubscriptions() {
  const p = podcasts.find({ id: { $regex: '.*' }});
  const podcastMap = _.fromPairs(_.map(p, i => [i.id, i]));

  return {
    type: FETCH_SUBSCRIPTIONS,
    data: podcastMap
  };
}
