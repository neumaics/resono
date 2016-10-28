import React, { PropTypes } from 'react';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default class SearchItem extends React.Component {
  render() {
    const { onClick, title } = this.props;

    return (
      <tr onClick={onClick}>
        <td>{title}</td>
      </tr>
    );
  }
}

SearchItem.propTypes = propTypes;
