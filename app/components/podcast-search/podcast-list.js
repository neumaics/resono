import React, { PropTypes } from 'react';
import SearchInput from './search-input';
import PodcastItem from './podcast-item';

let PodcastList = ({ podcasts }) => {
  let onClick = (item) => {
    console.log(item);
  };

  const podcastItems = podcasts.map((item, index) => {
    return <PodcastItem onClick={onClick} title={item.title} key={index} />
  });

  return (
    <div>
      <SearchInput />
      <ul>
        {podcastItems}
      </ul>
    </div>
  );
};


PodcastList.propTypes = {
  podcasts: PropTypes.array
};

export default PodcastList;
