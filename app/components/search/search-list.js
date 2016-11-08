import React, { PropTypes } from 'react';
import PodcastItem from './search-item';

const propTypes = {
  podcasts: PropTypes.array
};

export default class SearchList extends React.Component {
  render() {
    const { podcasts } = this.props;

    const podcastItems = podcasts.map((item, index) => {
      return <PodcastItem title={item.title} key={index} podcastId={item.id} />;
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
