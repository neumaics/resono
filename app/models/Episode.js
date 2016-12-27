import md5 from 'md5';

export default class Episode { }

Episode.fromRss = function(rssItem) {
  return {
    id: md5(rssItem.title + rssItem.pubDate),
    title: rssItem.title,
    description: rssItem.description,
    pubDate: rssItem.pubDate,
    url: rssItem.enclosure.url,
    listened: false
  };
};
