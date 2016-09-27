import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as search from '../../actions/podcast-search-actions';

const searchInput = ({ onSearchClick }) => {
  let input;
  const onSubmit = (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
      return;
    }

    onSearchClick();
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={node => {
        input = node
      }} />
      <button type="submit">
        search
      </button>
    </form>
  );
}

searchInput.propTypes = {
  onSearchClick: PropTypes.func.isRequired
};

const SearchInput = connect()(searchInput);

export default SearchInput;
