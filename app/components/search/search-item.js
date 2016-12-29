import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  podcastId: PropTypes.number.isRequired,
  onSubscribeClick: PropTypes.func,
  onUnsubscribeClick: PropTypes.func,
  isSubbed: PropTypes.bool
};

export default class SearchItem extends React.Component {
  onClick(event, item) {
    console.info(event, item);
  }

  subscribeButton(item, onSubscribeClick) {
    return (<p>
      <button className="btn btn-primary btn-sm" onClick={() => onSubscribeClick(item.collectionId, item.feedUrl)}>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    </p>);
  }

  unsubscribeButton(item, onUnsubscribeClick) {
    return (<p>
      <button className="btn btn-danger btn-sm" onClick={() => onUnsubscribeClick(item.collectionId)}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </button>
    </p>);
  }

  render() {
    const { item, onSubscribeClick, isSubbed, onUnsubscribeClick } = this.props;
    const subscribeButton = isSubbed ? this.unsubscribeButton(item, onUnsubscribeClick) : this.subscribeButton(item, onSubscribeClick);

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
              {subscribeButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchItem.propTypes = propTypes;
