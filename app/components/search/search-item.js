import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  title: PropTypes.string.isRequired,
  podcastId: PropTypes.number.isRequired
};

export default class SearchItem extends React.Component {
  render() {
    const { title, podcastId } = this.props;

    return (
      <tr>
        <td><Link to={`/podcast/${podcastId}`}>{title}</Link></td>
      </tr>
    );
  }
}

SearchItem.propTypes = propTypes;
