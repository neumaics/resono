import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';
import Immutable from 'immutable';

import EpisodeList from '../../../../app/components/subscriptions/episode-list';

describe('<EpisodeList />', () => {
  const episodes = Immutable.fromJS([{
    id: '123abc',
    removed: false,
    pubDate: new Date().getTime()
  }]);

  it('should render', () => {
    const wrapper = shallow(<EpisodeList episodes={episodes} sortBy="pubDate" order="desc"/>);

    expect(wrapper.find('.episode-list').length).toEqual(1);
  });
});
