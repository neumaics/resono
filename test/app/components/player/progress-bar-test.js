import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

import ProgressBar from '../../../../app/components/player/progress-bar';

describe('<ProgressBar />', () => {
  describe('with default property values', () => {
    const wrapper = shallow(<ProgressBar duration={1} position={0} bytesLoaded={0} bytesTotal={1} onPositionChange={() => {}}/>);

    it('should render', () => {
      expect(wrapper.find('.progress-bar-container').length).toEqual(1);
    });

    it('should have a ribbon for play progress', () => {
      expect(wrapper.find('.progress-bar-ribbon.play-progress').length).toEqual(1);
    });

    it('should have a ribbon for download progress', () => {
      expect(wrapper.find('.progress-bar-ribbon.load-progress').length).toEqual(1);
    });

    it('should have a handle or indicator for current position', () => {
      expect(wrapper.find('.progress-bar-handle').length).toEqual(1);
    });
  });
});
