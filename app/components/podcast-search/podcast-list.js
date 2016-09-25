import React, { PropTypes } from 'react';
import SearchInput from './search-input';

const PodcastList = ({ podcasts }) => (
  <div>
    <SearchInput />
    <ul>
    </ul>
  </div>
);


PodcastList.propTypes = {
  podcasts: PropTypes.array
};

export default PodcastList;
