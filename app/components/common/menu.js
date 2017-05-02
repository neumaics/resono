import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
  render() {
    //TODO: Make this dynamic.
    return (
      <div className="menu">
        <ul>
          <li><Link to={'/podcast'} activeClassName="active"><i className="fa fa-search" aria-hidden="true"></i></Link></li>
          <li><Link to={'/subscriptions'} activeClassName="active"><i className="fa fa-podcast" aria-hidden="true"></i></Link></li>
          <li><Link to={'/playlists'} activeClassName="active"><i className="fa fa-inbox" aria-hidden="true"></i></Link></li>
          <li><Link to={'/settings'} activeClassName="active"><i className="fa fa-cog" aria-hidden="true"></i></Link></li>
        </ul>
      </div>
    );
  }
}
