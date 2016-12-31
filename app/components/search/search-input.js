import React, { PropTypes } from 'react';

const propTypes = {
  query: PropTypes.string,
  onSearchClick: PropTypes.func.isRequired
};

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event, onSearchClick) {
    event.preventDefault();
    const value = this.input.value.trim();
    if (!value) {
      return;
    }

    onSearchClick(value);
  }

  render() {
    const { onSearchClick, query } = this.props;

    return (
      <form className="search-input" onSubmit={(event) => {this.onSubmit(event, onSearchClick);}}>
        <div className="input-group">
          <input
            className="form-control"
            ref={(node) => { this.input = node; }}
            type="text"
            placeholder="Search podcasts..."
            defaultValue={query} />
          <span className="input-group-btn">
            <button className="btn btn-secondary"
              type="button"
              onClick={(event) => {this.onSubmit(event, onSearchClick);}}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

SearchInput.propTypes = propTypes;
