import React, { PropTypes } from 'react';

const propTypes = {
  podcast: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { podcast, title } = this.props;

    return <p className="player-podcast-info">{`${podcast} - ${title}`}</p>;
  }
}

Info.proptypes = propTypes;
