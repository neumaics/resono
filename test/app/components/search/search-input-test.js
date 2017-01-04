import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import SearchInput from '../../../../app/components/search/search-input';

describe('<SearchInput />', () => {
  it('should render', () => {
    const wrapper = shallow(<SearchInput />);

    expect(wrapper.find('.search-input').length).toEqual(1);
  });
});
