import React from 'react';
import { connect } from 'react-redux';

class SettingsContainer extends React.Component {
  render() {
    const { config } = this.props;
    // const str = JSON.stringify(config, null, '  ');

    return(
      <div className="settings-container">
        <div className="menu">
          <ul>
            <li><a href="#">Player</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

// function mapDispatchToProps(dispatch) {
//   return {};
// }

export default connect(mapStateToProps)(SettingsContainer);
