import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Layout from './components/layout';

import store from './store';
const root = document.getElementById('app');

ReactDom.render(
  <Provider store={store}>
    <Layout />
  </Provider>, root);
