import React, { PropTypes } from 'react';
import PodcastItem from './search-item';

const propTypes = {
  podcasts: PropTypes.array,
  onItemSelect: PropTypes.func
};

export default class SearchList extends React.Component {
  render() {
    const { podcasts, onItemSelect } = this.props;

    const podcastItems = podcasts.map((item, index) => {
      return <PodcastItem onClick={() => onItemSelect(item.id, item.feedUrl)} title={item.title} key={index} />;
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

SearchList.propTypes = propTypes;
