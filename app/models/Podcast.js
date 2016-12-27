import Episode from './Episode';
import Immutable from 'immutable';

const Podcast = function () { };

Podcast.toMap = function (podcast) { return Immutable.fromJS(podcast); };

Podcast.fromRss = function (id, feedUrl, rssDetail) {
  const categories = rssDetail['itunes:category'];

  return {
    id: id,
    title: rssDetail.title,
    feedUrl: feedUrl,
    copyright: rssDetail.copyright,
    categories: categories.length ? categories.map((item) => { return item.text; }) : [],
    description: rssDetail.description,
    episodes: rssDetail.item.map((item) => {
      return Episode.fromRss(item);
    }),
    lastUpdated: new Date()
  };
};

export default Podcast;
