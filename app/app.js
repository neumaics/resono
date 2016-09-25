import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Layout from './components/layout';

import store from './store';

ReactDom.render(
  <Provider store={store}>
    <Layout />
  </Provider>, document.getElementById('app'));
