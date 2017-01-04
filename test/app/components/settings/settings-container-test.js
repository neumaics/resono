import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from 'enzyme';
import expect from 'expect';

import SettingsContainer from '../../../../app/components/settings/settings-container';

const middlewares = [ thunk ];
const store = configureMockStore(middlewares)({
  config: { player: {}},
});

describe('<SettingsContainer />', () => {
  it('should render', () => {
    const wrapper = render(<SettingsContainer store={store} />);

    expect(wrapper.find('.settings-container').length).toEqual(1);
  });
});
