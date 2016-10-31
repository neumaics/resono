import React from 'react';
import { connect } from 'react-redux';

class SettingsContainer extends React.Component {
  render() {
    return(
      <div>
        <h4>Settings</h4>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {};
// }

export default connect()(SettingsContainer);
