import React, { PropTypes } from 'react';

const PodcastItem = ({ onClick, title }) => (
  <tr onClick={onClick}>
    <td>{title}</td>
  </tr>
);

PodcastItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default PodcastItem;
