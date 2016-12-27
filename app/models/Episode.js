import md5 from 'md5';
import Immutable from 'immutable';

export default class Episode {
  constructor(rssItem) {
    this.id = md5(rssItem.guid.$t);
    this.title = rssItem.title;
    this.description = rssItem.description;
    this.pubDate = rssItem.pubDate;
    this.url = rssItem.enclosure.url;
    this.listened = false;
  }

  toMap() {
    return Immutable.Map(this);
  }
}

/*{
  "title": "#605: Kid Logic 2016",
  "link": "http://feed.thisamericanlife.org/~r/talpodcast/~3/YnO2wEBK98g/kid-logic-2016",
  "description": "Stories of kids using perfectly logical arguments, and arriving at perfectly wrong conclusions. <br><br>An updated version of an episode from 2001, with one story swapped.<img src=\"http://feeds.feedburner.com/~r/talpodcast/~4/YnO2wEBK98g\" height=\"1\" width=\"1\" alt=\"\"/>",
  "pubDate": "Mon, 19 Dec 2016 00:00:00 +0000",
  "dc:creator": "This American Life",
  "guid": {
    "isPermaLink": "false",
    "$t": "7221 at https://www.thisamericanlife.org"
  },
  "itunes:duration": "01:00:55",
  "media:content": {
    "url": "http://feed.thisamericanlife.org/~r/talpodcast/~5/yFFVc3YHfGo/605.mp3",
    "type": "audio/mpeg"
  },
  "itunes:explicit": "no",
  "itunes:subtitle": "Stories of kids using perfectly logical arguments, and arriving at perfectly wrong conclusions. An updated version of an episode from 2001, with one story swapped.",
  "itunes:author": "This American Life",
  "itunes:summary": "Stories of kids using perfectly logical arguments, and arriving at perfectly wrong conclusions. An updated version of an episode from 2001, with one story swapped.",
  "feedburner:origLink": "https://www.thisamericanlife.org/radio-archives/episode/605/kid-logic-2016",
  "enclosure": {
    "url": "http://feed.thisamericanlife.org/~r/talpodcast/~5/yFFVc3YHfGo/605.mp3",
    "length": "0",
    "type": "audio/mpeg"
  },
  "feedburner:origEnclosureLink": "http://www.podtrac.com/pts/redirect.mp3/podcast.thisamericanlife.org/podcast/605.mp3"
},*/
