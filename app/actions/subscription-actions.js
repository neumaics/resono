import {
  FETCH_SUBSCRIPTIONS,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SUBSCRIBE_FAILURE
} from './types';
import Loki from 'lokijs';

const db = new Loki('subscriptions.json');
const podcasts = db.getCollection('podcasts') || db.addCollection('podcasts', { indices: [ 'id' ]});
console.log(podcasts);

export function subscribeAndSave(id) {
  return function (dispatch) {
    const sub = podcasts.findOne({ id });

    if (!sub) {
      podcasts.insert({ id });
      dispatch(subscribe(id));
    } else {
      dispatch(subscribeFailure(id));
    }
  };
}

export function subscribe(id) {
  return {
    type: SUBSCRIBE,
    id: id
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
    message: `Podcast with id [${id}] is already subscribed`
  };
}

export function getSubscriptions() {
  return {
    type: FETCH_SUBSCRIPTIONS,
    data: podcasts.find({ id: { $regex: /.*/ }})
  };
}
