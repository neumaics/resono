import React from 'react'

import Menu from './menu'
import Search from './podcast-search/'

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Menu />
        <Search />
      </div>
    );
  }
}
