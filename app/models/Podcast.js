import Episode from './Episode';
import Immutable from 'immutable';

export default class Podcast {
  constructor(id, feedUrl, rssDetail) {
    this.id = id;
    this.title = rssDetail.title;
    this.feedUrl = feedUrl;
    this.copyright = rssDetail.copyright;

    const categories = rssDetail['itunes:category'];
    this.categories = categories.length ? categories.map((item) => { return item.text; }) : [];
    
    this.description = rssDetail.description;
    this.episodes = rssDetail.item.map((item) => {
      return new Episode(item);
    });
    this.lastUpdated = new Date();
  }

  toMap() {
    return Immutable.Map(this);
  }
}

/*    "title": "This American Life",
    "link": "https://www.thisamericanlife.org",
    "description": "This American Life is a weekly public radio show, heard by 2.2 million people on more than 500 stations. Another 1.5 million people download the weekly podcast. It is hosted by Ira Glass, produced in collaboration with Chicago Public Media, delivered to stations by PRX The Public Radio Exchange, and has won all of the major broadcasting awards.",
    "language": "en",
    "copyright": "Copyright 1995-2016 Ira Glass",

    "itunes:category": [
      {
        "text": "Society & Culture"
      },
      {
        "text": "Arts"
      },
      {
        "text": "News & Politics"
      }
    ],

    "media:thumbnail": {
      "url": "http://www.thisamericanlife.org/sites/all/themes/thislife/images/logo-square-1400.jpg"
    },*/
