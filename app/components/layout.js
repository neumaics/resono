import React from 'react';

import Menu from './menu';
import SearchForm from './search-form';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <SearchForm />
      </div>
    );
  }
}
