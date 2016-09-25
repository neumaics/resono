import React, { PropTypes } from 'react';

const PodcastItem = ({ onClick, title }) => (
  <li onClick={onClick}>
    {title}
  </li>
);

PodcastItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default PodcastItem;
