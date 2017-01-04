import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import Menu from '../../../../app/components/common/Menu';

describe('<Menu />', () => {
  it('should render', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.find('.menu').length).toEqual(1);
  });
});
