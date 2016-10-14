import React from 'react'
import { connect } from 'react-redux'

const searchInput = ({ onSearchClick }) => {
  let input;
  const onSubmit = (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
      return;
    }

    onSearchClick(input.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={node => {
        input = node
      }} />
    </form>
  );
}

const SearchInput = connect()(searchInput);

export default SearchInput;
