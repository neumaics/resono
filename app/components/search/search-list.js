import React, { PropTypes } from 'react';
import SearchInput from './search-input';
import PodcastItem from './search-item';

export default class SearchList extends React.Component {
  render() {
    const { podcasts, onItemSelect } = this.props;

    const podcastItems = podcasts.map((item, index) => {
      return <PodcastItem onClick={(e) => onItemSelect(item.id, item.feedUrl)} title={item.title} key={index} />
    });

    return (
      <table className='table table-sm table-hover'>
        <tbody>
          {podcastItems}
        </tbody>
      </table>
    );
  }
}

SearchList.propTypes = {
  podcasts: PropTypes.array,
  onItemSelect: PropTypes.func
};
