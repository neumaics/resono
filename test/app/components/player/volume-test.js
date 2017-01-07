import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';

import Volume from '../../../../app/components/player/volume';

describe('<Volume />', () => {
  it('should render', () => {
    const wrapper = shallow(<Volume volume={80} onVolumeChange={sinon.spy()} />);

    expect(wrapper.find('.volume-container').length).toEqual(1);
  });
});
