import React from 'react';
import { connect } from 'react-redux';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event, onSearchClick) {
    event.preventDefault();

    if (!this.input.value.trim()) {
      return;
    }

    onSearchClick(this.input.value);
  }

  render() {
    const { onSearchClick } = this.props;

    return (
      <form onSubmit={(event) => {this.onSubmit(event, onSearchClick);}}>
        <div className="input-group">
          <input
            className="form-control"
            ref={(node) => { this.input = node; }}
            type="text"
            placeholder="Search podcasts..." />
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

export default connect()(SearchInput);
