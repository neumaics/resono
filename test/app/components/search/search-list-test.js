import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import SearchList from '../../../../app/components/search/search-list';

describe('<SearchList />', () => {
  it('should render', () => {
    const wrapper = shallow(<SearchList podcasts={[]}/>);

    expect(wrapper.find('.search-results').length).toEqual(1);
  });

  it.skip('should make a PodcastItem per podcast found', () => {

  });
});
