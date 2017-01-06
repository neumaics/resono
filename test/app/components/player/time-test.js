import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import Time from '../../../../app/components/player/time';

describe('<Time />', () => {
  describe('with default property values', () => {
    it('should render', () => {
      const wrapper = shallow(<Time length={6000} />);

      expect(wrapper.find('.time-display').length).toEqual(1);
    });
  });
});
