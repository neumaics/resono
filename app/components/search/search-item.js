import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object.isRequired,
  podcastId: PropTypes.number.isRequired,
  onSubscribeClick: PropTypes.func,
  onUnsubscribeClick: PropTypes.func,
  isSubbed: PropTypes.bool
};

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // TODO: remove 'transient' state
    this.setState({
      expanded: !this.state.expanded
    });
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
    const cardClasses = ['podcast-card'];
    if (this.state.expanded) cardClasses.push('expanded');

    return (
      <div className={cardClasses.join(' ')} onClick={this.onClick}>
        <img className="podcast-cover"  src={item.artworkUrl100}></img>
        <div className="podcast-content">
          <h6 className="truncate">{item.trackName}</h6>
          {subscribeButton}
        </div>
      </div>
    );
  }
}

SearchItem.propTypes = propTypes;
