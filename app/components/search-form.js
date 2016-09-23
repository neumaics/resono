import React from 'react';
import axios from 'axios';

export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      results: []
    };
  }

  handleQueryChange(e) {
    this.setState({ query: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const params = {
      term: this.state.query,
      media: 'podcast'
    }

    //TODO: Move to service
    axios.get('https://itunes.apple.com/search', { params })
      .then((response) => {
        const results = response.data.results.map((item) => {
          return { id: item.artistId, name: item.artistName };
        });

        this.setState({ results });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const items = this.state.results.map((item, index) => {
      return <li key={index}>{item.name}</li>
    });

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input onChange={this.handleQueryChange.bind(this)} type="text"/>
          <input type="submit" value="Submit" />
        </form>
        <span>{this.state.query}</span>
        <ul>
            {items}
        </ul>
      </div>
    );
  }
}
