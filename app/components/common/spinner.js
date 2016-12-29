import React, { PropTypes } from 'react';

const propTypes = {
  visible: PropTypes.bool
};

const defaultProps = {
  visible: false
};

export default class Spinner extends React.Component {
  render() {
    const isVisible = this.props.visible;

    const spinner = (
      <span className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </span>
    );

    return isVisible ? spinner : <span></span>;
  }
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
