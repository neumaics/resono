import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired
};

export default class Episode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { play, title, isCurrent } = this.props;

    return (
      <div className="episode-item">
        <button className="btn btn-sm" onClick={play}><i className="fa fa-play"></i></button>
        <span>{title}{isCurrent ? '-current' : ''}</span>
      </div>
    );
  }
}

Episode.propTypes = propTypes;
