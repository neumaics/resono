import React, { PropTypes } from 'react';

export default class Spinner extends React.Component {
  render() {
    const isVisible = this.props.visible;

    const spinner = (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );

    return isVisible ? spinner : <div></div>;

  }
}

Spinner.propTypes = {
  visible: PropTypes.bool
};
