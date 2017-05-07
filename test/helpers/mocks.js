import Immutable from 'immutable';

export const mockSubscriptions = Immutable.fromJS({
  "31415926": {
    "id": "31415926",
    "title": "podcast title",
    "feedUrl": "http://podcast.pod`",
    "copyright": "copywright",
    "categories": [],
    "description": "description",
    "episodes": [
      {
        "id": "10769dbbb719c2047d7438cb5a90e605",
        "title": "title 1",
        "description": "description 1",
        "pubDate": 1492142400000,
        "url": "https://podcast.pod/episode01.mp3",
        "listened": false,
        "removed": false
      },
      {
        "id": "b06b2f4c6e86a291c3ac07370be3becb",
        "title": "title 2",
        "description": "description 2",
        "pubDate": 1492142400000,
        "url": "https://podcast.pod/episode02.mp3",
        "listened": false,
        "removed": false
      },
      {
        "id": "cfc76213035e23ef3a13b38e8d8bb827",
        "title": "title 3",
        "description": "description 3",
        "pubDate": 1492142400000,
        "url": "https://podcast.pod/episode03.mp3",
        "listened": false,
        "removed": false
      }
    ]
  }
});

export const mockEpisodes = Immutable.fromJS([
  {
    "id": "10769dbbb719c2047d7438cb5a90e605",
    "title": "title 1",
    "description": "description 1",
    "pubDate": 1492142400000,
    "url": "https://podcast.pod/episode01.mp3",
    "listened": false,
    "removed": false,
    "podcast": "podcast title"
  },
  {
    "id": "b06b2f4c6e86a291c3ac07370be3becb",
    "title": "title 2",
    "description": "description 2",
    "pubDate": 1492142400000,
    "url": "https://podcast.pod/episode02.mp3",
    "listened": false,
    "removed": false,
    "podcast": "podcast title"
  },
  {
    "id": "cfc76213035e23ef3a13b38e8d8bb827",
    "title": "title 3",
    "description": "description 3",
    "pubDate": 1492142400000,
    "url": "https://podcast.pod/episode03.mp3",
    "listened": false,
    "removed": false,
    "podcast": "podcast title"
  }
]);
