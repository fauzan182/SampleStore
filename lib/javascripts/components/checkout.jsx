import React, {Component} from 'react';
import {Link} from 'react-router';
import ItemTable from './item-table';
import Input from './input';
import BillingAddress from './billing-address';
import ShippingAddress from './shipping-address';
import ApplicationAction from '../actions/application-action';
import CustomerDetailsStore from '../stores/customer-details-store';
import ChargeStore from '../stores/charge-store';
import CartStore from '../stores/cart-store';

const stylesheets = {
  btnWrapper: {
    marginBottom: '20px'
  },
  btnVtweb: {
    background: '#3693d6 url("/assets/images/vt_web-logo.png") center center no-repeat',
    display: 'inline-block',
    backgroundSize: '58%',
    padding: '20px 80px !important'
  },
  btnDirect: {
    background: '#67364b url("/assets/images/vt_direct-logo.png") center center no-repeat',
    display: 'inline-block',
    backgroundSize: '70%',
    padding: '20px 80px !important',
    marginLeft: '10px'
  }
}


export default class Checkout extends Component{

  static willTransitionTo(transition) {
    let products = CartStore.getCart().data
    if(products.length === 0){
      transition.redirect('/')
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      email: CustomerDetailsStore.getEmail(),
      items: CartStore.getCart().data,
      totalPrice: CartStore.getCart().totalPrice
    }
  }

  _handleEmailChange (value) {
    ApplicationAction.setEmail(value);
    this.setState({email: value})
  }

  _handleVtWeb () {
    ApplicationAction.chargeVtWeb();
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2 className="no-bold">Checkout</h2>
          <hr style={{borderBottom: '0px'}}/>
          <ItemTable
            items={this.state.items}
            totalPrice={this.state.totalPrice}
          />
          <div className="form-horizontal text-center">
            <Input
              ofset={2}
              span={8}
              label="Email"
              type="email"
              placeholder="Email"
              defaultValue={this.state.email}
              onChange={this._handleEmailChange.bind(this)}
            />
          </div>
          <div className="row">
            <BillingAddress />
            <ShippingAddress />
          </div>
          <hr style={{marginTop: '0px'}}/>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="text-center">
              <p>Pay with</p>
              <div style={stylesheets.btnWrapper}>
                <button className="btn" style={stylesheets.btnVtweb} onClick={this._handleVtWeb.bind(this)}></button>
                <Link to="/vtdirect" className="btn" style={stylesheets.btnDirect}></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
