import React, { PropTypes } from 'react';

const propTypes = {
  query: PropTypes.string,
  onSearchClick: PropTypes.func.isRequired
};

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    const { onSearchClick } = this.props;
    this.onSubmit = this.onSubmit(onSearchClick).bind(this);
  }

  onSubmit(onSearchClick) {
    return (event) => {
      event.preventDefault();
      const value = this.input.value.trim();
      if (!value) {
        return;
      }

      onSearchClick(value);
    };
  }

  render() {
    const { query } = this.props;

    return (
      <form className="search-input" onSubmit={this.onSubmit}>
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
              onClick={this.onSubmit}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

SearchInput.propTypes = propTypes;
