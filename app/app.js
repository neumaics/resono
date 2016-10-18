import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import Layout from './components/layout'
import SearchContainer from './components/search/search-container'
import DetailContainer from './components/detail/detail-container'

import store from './store'
const root = document.getElementById('app');

ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={SearchContainer} />
        <Route path="search" component={SearchContainer} />
        <Route path="detail/:id" component={DetailContainer} />
      </Route>
    </Router>
  </Provider>, root);
