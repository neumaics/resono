import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';
import Immutable from 'immutable';

import EpisodeItem from '../../../../app/components/subscriptions/episode-item';

describe('<EpisodeItem />', () => {
  const episode = Immutable.fromJS({
    url: 'http://podcast.rss/episode.mp3',
    title: 'this week in popular podcast',
    pubDate: new Date(),
    listened: false
  });

  const podcastName = 'popular podcast';

  it('should render', () => {
    const wrapper = shallow(<EpisodeItem episode={episode} podcastName={podcastName}/>);

    expect(wrapper.find('.episode-item').length).toEqual(1);
  });
});
