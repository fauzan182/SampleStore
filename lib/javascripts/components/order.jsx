import React, {Component} from 'react';
import Immutable from 'immutable';

import ItemTable from './item-table';
import Address from './address';

import CustomerDetailsStore from '../stores/customer-details-store';
import ChargeStore from '../stores/charge-store';
import CartStore from '../stores/cart-store';
import ApplicationAction from '../actions/application-action';


export default class Order extends Component{

  constructor (props) {
    super(props);
    const cart = Immutable.Map(CartStore.getCart())
    const customerDetails = Immutable.Map(CustomerDetailsStore.getCustomerDetails());
    this.state = {
      cartState: {
        items: cart.get('data'),
        totalPrice: cart.get('totalPrice')
      },
      billingAddress: customerDetails.get('billing_address'),
      shippingAddress: customerDetails.get('shipping_address')
    }
  }

  componentWillMount () {
    ApplicationAction.resetCart();
    ApplicationAction.resetCustomerDetails();
  }

  _paymentStatus () {
    const status_code = ChargeStore.getVtDirectResponse().status_code
    if(status_code === '200') {
      return (
        <span className="btn btn-success disabled">Paid</span>
      )
    }else if(status_code === '201'){
      return (
        <span className="btn btn-warning disabled">Pending</span>
      )
    }else{
      return (
        <span className="btn btn-danger disabled">Unpaid</span>
      )
    }
  }

  _billingAddress () {
    return CustomerDetailsStore.getBillingAddress();
  }

  _shippingAddress () {
    return CustomerDetailsStore.getShippingAddress();
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <h2>Order Status</h2>
            </div>
            <div className="col-md-6">
              <h2 className="text-right">
                {this._paymentStatus()}
              </h2>
            </div>
          </div>
          <hr style={{marginTop: '0px'}}/>
          <ItemTable
            items={this.state.cartState.items}
            totalPrice={this.state.cartState.totalPrice}
          />
          <h3>Customer Details</h3>
          <hr style={{marginTop: '0px'}}/>
          <div className="row">
            <div className="col-md-6">
              <h4>Billing Information</h4>
              <Address
                firstName={this.state.billingAddress.first_name}
                lastName={this.state.billingAddress.last_name}
                address={this.state.billingAddress.address}
                city={this.state.billingAddress.city}
                postalCode={this.state.billingAddress.postal_code}
                phone={this.state.billingAddress.phone}
              />
            </div>
            <div className="col-md-6">
              <h4>Shipping Information</h4>
              <Address
                firstName={this.state.shippingAddress.first_name}
                lastName={this.state.shippingAddress.last_name}
                address={this.state.shippingAddress.address}
                city={this.state.shippingAddress.city}
                postalCode={this.state.shippingAddress.postal_code}
                phone={this.state.shippingAddress.phone}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
