import React, { PropTypes } from 'react';

export default class DetailList extends React.Component {
  constructor({items, onItemSelect}) {
    super();
    this.items = items;
    this.onItemSelect = onItemSelect;
  }

  render() {
    const detailItems = this.items.map((item, index) => {
      return <tr onClick={(e) => this.onItemSelect(item)} key={index}><td>{item.title}</td></tr>
    });

    return (
      <table className='table table-sm table-hover'>
        <tbody>
          {detailItems}
        </tbody>
      </table>
    );
  }
}

DetailList.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func
};
