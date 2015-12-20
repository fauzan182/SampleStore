import React, {Component} from 'react';
import accounting from 'accounting';

const stylesheets = {
  cartItemImage: {
    height: "60px",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    textAlign: 'center'
  },
  productName: {
    backgroundColor: 'rgba(249,249,255,0.5)',
    padding: '5px',
    fontWeight: 'bold',
    marginTop: '10px',
    display: 'inline-block'
  }

}

export default class ItemTableList extends Component{

  constructor (props) {
    super(props)
  }

  render () {
    stylesheets.cartItemImage.backgroundImage = `url(${this.props.image})`;
    return (
      <tr>
        <td className="col-md-6">
          <div style={stylesheets.cartItemImage}>
            <span style={stylesheets.productName}>{this.props.name}</span>
          </div>
        </td>
        <td>
          <span>{this.props.quantity}</span>
        </td>
        <td>
          <span>{accounting.formatMoney(this.props.price, "Rp ", 0, ".", '')}</span>
        </td>
        <td>
          <div className="text-right">
            <span>{accounting.formatMoney(this.props.totalPrice, "Rp ", 0, ".", '')}</span>
          </div>
        </td>
      </tr>
    )
  }
}
