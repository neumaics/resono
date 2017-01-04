import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import expect from 'expect';

// import PlayerContainer from '../../../../app/components/player/player-container';

describe.skip('<PlayerContainer />', () => {
  it('should render', () => {
    const wrapper = shallow(<PlayerContainer />);

    expect(wrapper.find('div').length).toEqual(1);
  });
});
