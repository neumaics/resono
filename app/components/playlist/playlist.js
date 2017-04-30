import React, { PropTypes } from 'react';
import Episode from './episode';

const propTypes = {
  episodes: PropTypes.object,
  current: PropTypes.string
};

export default class PlayList extends React.Component {
  render()  {
    const { episodes, current } = this.props;

    return (
      <div className="playlist">
        {episodes.map((ep) => {
          return <Episode key={ep.get('id')} title={ep.get('title')} isCurrent={current == ep.get('id')} />;
        })}
      </div>
    );
  }
}

PlayList.propTypes = propTypes;
