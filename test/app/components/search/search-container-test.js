import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from 'enzyme';
import expect from 'expect';
import Immutable from 'immutable';

import SearchContainer from '../../../../app/components/search/search-container';

const middlewares = [ thunk ];
const store = configureMockStore(middlewares)({
  search: { query: 'this amer' },
  subscriptions: Immutable.Map()
});

describe('<SearchContainer />', () => {
  it('should render', () => {
    const wrapper = render(<SearchContainer store={store} />);

    expect(wrapper.find('.search-container').length).toEqual(1);
  });
});
