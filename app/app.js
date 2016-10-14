import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import Layout from './components/layout'
import DetailContainer from './components/detail/detail-container'

import store from './store'
const root = document.getElementById('app');

ReactDom.render(
  <Provider store={store}>
     <Router history={browserHistory}>
      <Route path="/detail/:id" component={DetailContainer} />
      <Route path="*" component={Layout} />
    </Router>
  </Provider>, root);
