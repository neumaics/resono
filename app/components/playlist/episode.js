import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
};

export default class Episode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, isCurrent } = this.props;

    return <p>{title}{isCurrent ? '-current' : ''}</p>;
  }
}

Episode.propTypes = propTypes;
