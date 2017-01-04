import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import SearchItem from '../../../../app/components/search/search-item';

describe('<SearchItem />', () => {
  const item = {
    artworkUrl100: 'http://www.podcast.com/artwork.png',
    trackName: 'Popular Podcast'
  };

  it('should render', () => {
    const wrapper = shallow(<SearchItem item={item} />);

    expect(wrapper.find('.podcast-card').length).toEqual(1);
  });
});
