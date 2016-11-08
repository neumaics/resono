import {
  SUBSCRIBE,
  UNSUBSCRIBE
} from './types';
import loki from 'loki';

const db = new loki('subscriptions.db');

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

export function getSubscriptions() {
  return {
    type: "SOMETHING",
    data: db.query()
  };
}
