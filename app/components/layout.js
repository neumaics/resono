import React from 'react';
import PlayerContainer from './player/player-container';
import Menu from './common/menu';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <div className="container main-container">
          {this.props.children}
        </div>
        <PlayerContainer />
      </div>
    );
  }
}
