import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'enzyme';
import expect from 'expect';
import Episode from '../../../../app/components/playlist/episode';

describe('<Episode />', () => {
  it('should render', () => {
    const play = () => {};
    const isCurrent = false;
    const title = 'podcast title';

    const wrapper = render(<Episode title={title} isCurrent={isCurrent} play={play}/>);

    expect(wrapper.find('.episode-item').length).toEqual(1);
  });
});
