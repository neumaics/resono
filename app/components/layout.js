import React from 'react'

import Menu from './menu'
import SearchContainer from './search/search-container'

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Menu />
        <SearchContainer />
      </div>
    );
  }
}
