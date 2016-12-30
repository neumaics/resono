import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import Spinner from '../../../../app/components/common/Spinner';

describe('<Spinner />', () => {
  it('should not be visible if visibilty is not provided', () => {
    const wrapper = shallow(<Spinner />);

    expect(wrapper.find('span').length).toEqual(1);
  });

  it('should not be visible if `visible` is set to `false`', () => {
    const wrapper = shallow(<Spinner visible="false" />);

    expect(wrapper.find('span').length).toEqual(1);
  });

  it('should be visible if `visible` is set to `true`', () => {
    const wrapper = shallow(<Spinner visible="true" />);

    expect(wrapper.find('.spinner').length).toEqual(1);
    expect(wrapper.find('.double-bounce1').length).toEqual(1);
    expect(wrapper.find('.double-bounce2').length).toEqual(1);
  });
});
