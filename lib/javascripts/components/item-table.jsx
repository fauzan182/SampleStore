import React, {Component} from 'react';
import accounting from 'accounting';
import ItemTableList from './item-table-list';


export default class ItemTable extends Component{

  constructor (props) {
    super(props)
  }

  _renderItemList() {
    return this.props.items.map( (product, index, array) => {
      return (
        <ItemTableList
          key={product.id}
          name={product.name}
          price={product.price}
          totalPrice={product.totalPrice}
          quantity={product.quantity}
          image={product.image}
        />
      )
    }, this)
  }

  render () {
    return (
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>
              <div className="text-right">Total</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {this._renderItemList()}
          <tr>
            <td colSpan={3}>
              <div className="text-right">
                Total:
              </div>
            </td>
            <td>
              <div className="text-right">
                <b>{accounting.formatMoney(this.props.totalPrice, "Rp ", 0, ".", '')}</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
