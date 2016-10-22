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
      <div className="input-group">
        <input
          className="form-control"
          ref={node => { input = node }}
          type="text"
          placeholder="Search podcasts..." />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button" onClick={onSubmit}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </span>
      </div>
    </form>
  );
}

const SearchInput = connect()(searchInput);

export default SearchInput;
