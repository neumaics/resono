import React from 'react'
import { connect } from 'react-redux'
import * as search from '../../actions/podcast-search-actions'

const searchInput = ({ dispatch }) => {
  let input;
  const onSubmit = (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
      return;
    }

    dispatch(search.fetchPodcasts(input.value));
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

const SearchInput = connect()(searchInput);

export default SearchInput;
