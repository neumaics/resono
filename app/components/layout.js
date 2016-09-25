import React from 'react';

import Menu from './menu';
import PodcastSearch from './podcast-search';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <PodcastSearch />
      </div>
    );
  }
}
