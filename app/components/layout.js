import React from 'react';
import PlayerContainer from './player/player-container';
import WindowMenu from './common/window-menu';
import Menu from './common/menu';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <div>
          <WindowMenu visible={process.platform != 'darwin'} />\
          <div className="main-container">
            {this.props.children}
          </div>
          <div className="player-overflow"></div>
        </div>
        <PlayerContainer />
      </div>
    );
  }
}
