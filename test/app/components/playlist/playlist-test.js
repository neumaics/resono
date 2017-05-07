import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'enzyme';
import expect from 'expect';
import PlaylistContainer from '../../../../app/components/playlist/playlist';
import { mockEpisodes } from '../../../helpers/mocks';

describe('<PlayList />', () => {
  it('should render', () => {
    const onPlayEpisode = () => {};
    const wrapper = render(<PlaylistContainer episodes={mockEpisodes} current={'10769dbbb719c2047d7438cb5a90e605'} onPlayEpisode={onPlayEpisode}/>);

    expect(wrapper.find('.playlist').length).toEqual(1);
  });
});
