import React from 'react'; // eslint-disable-line no-unused-vars
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from 'enzyme';
import expect from 'expect';
import Immutable from 'immutable';
import PlaylistContainer from '../../../../app/components/playlist/playlist-container';
import { mockSubscriptions } from '../../../helpers/mocks';

const middlewares = [ thunk ];
const store = configureMockStore(middlewares)({
  subscriptions: mockSubscriptions,
  playlist: Immutable.fromJS({
    sort: 'asc'
  })
});

describe('<PlaylistContainer />', () => {
  it('should render', () => {
    const wrapper = render(<PlaylistContainer store={store} />);

    expect(wrapper.find('.playlist-container').length).toEqual(1);
  });
});
