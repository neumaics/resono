import React from 'react';
import { connect } from 'react-redux';

class SettingsContainer extends React.Component {
  render() {
    const { config } = this.props;
    const str = JSON.stringify(config, null, '  ');

    return(
      <div>
        <h4>Settings</h4>
        <p>{str}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config.toJS()
  };
}

//
// function mapDispatchToProps(dispatch) {
//   return {};
// }

export default connect(mapStateToProps)(SettingsContainer);
