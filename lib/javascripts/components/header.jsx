import React, {Component} from 'react';
import accounting from 'accounting';
import CartStore from '../stores/cart-store';
import {Link} from 'react-router';

export default class Header extends Component{

  constructor (props) {
    super(props)
    this.state = {
      cartSize: 0,
      totalPrice: 0
    }
  }

  componentWillMount () {
    CartStore.addChangeListener(this._cartChangeListener.bind(this));
  }

  _cartChangeListener () {
    let cart = CartStore.getCart();
    this.setState({
      cartSize: cart.data.length,
      totalPrice: cart.totalPrice,
    })
  }

  _cartWording () {
    if (this.state.cartSize === 0) {
      return "Your cart is emtpy"
    }else{
      return (
        <Link to="/carts">
          You have {this.state.cartSize} item(s), {accounting.formatMoney(this.state.totalPrice, "Rp ", 0, ".", '')}
        </Link>
      )
    }
  }

  render () {
    return (
      <div id="header" className="container" style={{paddingTop: '20'}}>
        <div className="row">
          <div className="col-md-6">
            <a href="https://www.veritrans.co.id/">
              <img src="/assets/images/logo.png" alt="logo" />
            </a>
          </div>
          <div className="col-md-6">
            <div id="cart" style={{height: "50px", minWidth: "300px", float: 'right'}}>
              <div style={{lineHeight: "50px", marginBottom: 0}}>
                <p className="text-right">
                  <span className="glyphicon glyphicon-shopping-cart" style={{marginRight: "5px"}}></span>
                  {this._cartWording()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr style={{marginTop: 0}}/>
      </div>
    )
  }
}
