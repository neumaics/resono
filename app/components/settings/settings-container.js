import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateConfig } from '../../actions/config-actions';

class SettingsContainer extends React.Component {
  render() {
    const { config, updateConfig } = this.props;

    return(
      <div className="settings-container">
        <div className="menu">
          <ul role="nav">
            <li><Link to="/settings/player">Player</Link></li>
          </ul>
        </div>

        {React.cloneElement(this.props.children, { config: config, updateConfig: updateConfig })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateConfig: (configPath, value) => { dispatch(updateConfig(configPath, value)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
