import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  podcastId: PropTypes.number.isRequired,
  onSubscribeClick: PropTypes.func
};

export default class SearchItem extends React.Component {
  onClick(event, item) {
    console.log(event, item);
  }

  render() {
    const { item, onSubscribeClick } = this.props;

    return (
      <div className="card" onClick={(e) => this.onClick(e, item)}>
        <div className="card-block">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={item.artworkUrl100}></img>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading"></h4>
              <p>{item.trackName}</p>
              <p>
                <button className="btn btn-primary btn-sm" onClick={() => onSubscribeClick(item.collectionId, item.feedUrl)}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchItem.propTypes = propTypes;
