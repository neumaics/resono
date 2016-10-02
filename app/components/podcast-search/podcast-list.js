import React, { PropTypes } from 'react';
import SearchInput from './search-input';
import PodcastItem from './podcast-item';

let PodcastList = ({ podcasts, onItemSelect }) => {

  const podcastItems = podcasts.map((item, index) => {
    return <PodcastItem onClick={() => onItemSelect(item)} title={item.title} key={index} />
  });

  return (
    <div>
      <table className='table table-sm table-hover'>
        <tbody>
          {podcastItems}
        </tbody>
      </table>
    </div>
  );
};


PodcastList.propTypes = {
  podcasts: PropTypes.array,
  onItemSelect: PropTypes.func
};

export default PodcastList;
