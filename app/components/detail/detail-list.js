import React, { PropTypes } from 'react';

const propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func
};

export default class DetailList extends React.Component {
  render() {
    const { items, onItemSelect } = this.props;

    const detailItems = items.map((item, index) => {
      return (
        <tr style={{cursor: 'pointer'}} onClick={() => onItemSelect(item)} key={index}>
          <td>{item.title}</td>
        </tr>
      );
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

DetailList.propTypes = propTypes;
