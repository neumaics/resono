import Immutable from 'immutable';

export default class Subscription {
  constructor(id, feedUrl, detail) {
    console.log(detail);
    this.id = id;
    this.feedUrl = feedUrl;
    this.updateInterval = 1;
    this.lastUpdate = new Date().getTime();
    this.episodes = Immutable.List();
  }
}
