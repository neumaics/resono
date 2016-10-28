import React from 'react';
import PlayerContainer from './player/player-container';
import Menu from './common/menu';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="container main-container">
          <Menu />
          {this.props.children}
        </div>
        <PlayerContainer />
      </div>
    );
  }
}
