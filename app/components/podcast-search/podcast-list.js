import React, { PropTypes } from 'react';
import SearchInput from './search-input';
import PodcastItem from './podcast-item';

let PodcastList = ({ podcasts }) => {
  let onClick = (item) => {
    console.log(item);
  };

  const podcastItems = podcasts.map((item, index) => {
    return <PodcastItem onClick={() => onClick(item)} title={item.title} key={index} />
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
  podcasts: PropTypes.array
};

export default PodcastList;
