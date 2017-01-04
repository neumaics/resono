import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from 'enzyme';
import expect from 'expect';
import Immutable from 'immutable';

import SubscriptionsContainer from '../../../../app/components/subscriptions/subscriptions-container';

const middlewares = [ thunk ];
const store = configureMockStore(middlewares)({
  subscriptions: Immutable.Map(),
  playlist: Immutable.Map()
});

describe('<SubscriptionsContainer />', () => {
  it('should render', () => {
    const wrapper = render(<SubscriptionsContainer store={store} />);

    expect(wrapper.find('.subscriptions-container').length).toEqual(1);
  });
});
