import React, {Component} from 'react';
import ItemTable from './item-table';
import {Link} from 'react-router';

import CartStore from '../stores/cart-store';

export default class Carts extends Component{

  static willTransitionTo(transition) {
    let products = CartStore.getCart().data
    if(products.length === 0){
      transition.redirect('/')
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      items: CartStore.getCart().data,
      totalPrice: CartStore.getCart().totalPrice
    }
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2 className="no-bold">Shoping Cart</h2>
          <hr style={{borderBottom: '0px'}}/>
          <ItemTable
            items={this.state.items}
            totalPrice={this.state.totalPrice}
          />
          <hr style={{marginTop: '0px'}}/>
          <div className="row">
            <div className="col-md-12">
              <div className="pull-right" style={{marginBottom: "20px"}}>
                <Link to="/" className="btn btn-success">Back to shop</Link>
                <Link to="/checkout" className="btn checkout-button">Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
