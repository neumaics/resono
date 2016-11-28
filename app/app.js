import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './components/layout';
import SearchContainer from './components/search/search-container';
import SubscriptionsContainer from './components/subscriptions/subscriptions-container';
import SettingsContainer from './components/settings/settings-container';

import store from './store';
const root = document.getElementById('app');

ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={SearchContainer} />
        <Route path="podcast" component={SearchContainer} />
        <Route path="subscriptions" component={SubscriptionsContainer} />
        <Route path="settings" component={SettingsContainer} />
      </Route>
    </Router>
  </Provider>, root);
