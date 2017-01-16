import md5 from 'md5';
import moment from 'moment';

export default class Episode { }

Episode.fromRss = function(rssItem) {
  const url = rssItem.enclosure ? rssItem.enclosure.$.url : '';

  return {
    id: md5(rssItem.title + rssItem.pubDate),
    title: rssItem.title,
    description: rssItem.description,
    pubDate: moment(rssItem.pubDate, "ddd, DD MMM YYYY HH:mm:ss ZZ").utc().valueOf(),
    url: url,
    listened: false,
    removed: false
  };
};
