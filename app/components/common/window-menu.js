import React, { PropTypes } from 'react';
import electron from 'electron';

const propTypes = {
  visible: PropTypes.bool
};

const defaultProps = {
  visible: false
};

export default class WindowMenu extends React.Component {
  minimizeWindow() {
    electron.ipcRenderer.send('window-minimize');
  }

  maximizeWindow() {
    electron.ipcRenderer.send('window-maximize');
  }

  restoreWindow() {
    electron.ipcRenderer.send('window-restore');
  }

  closeWindow() {
    electron.ipcRenderer.send('window-close');
  }

  render() {
    const { visible } = this.props;
    const isMaximized = electron.ipcRenderer.send('window-is-maximized');

    const maxToggle = isMaximized ? 'window-restore' : 'window-maximize';
    const toggleFunction = isMaximized ? this.restoreWindow : this.maximizeWindow;

    const menu = (
      <ul className="window-menu">
        <li><button onClick={this.closeWindow}><i className="fa fa-window-close"></i></button></li>
        <li><button onClick={toggleFunction}><i className={`fa fa-${maxToggle}`}></i></button></li>
        <li><button onClick={this.minimizeWindow}><i className="fa fa-window-minimize"></i></button></li>
      </ul>
    );

    return visible ? menu : <span></span>;
  }
}

WindowMenu.propTypes = propTypes;
WindowMenu.defaultProps = defaultProps;
