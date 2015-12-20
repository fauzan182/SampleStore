import React, {Component} from 'react';
import ItemTable from './item-table';
import Input from './input';
import CardAlert from './card-alert';
import CardInput from './card-input';
import ExpMonthInput from './exp-month-input';
import ExpYearInput from './exp-year-input';
import CardNameInput from './card-name-input';
import CvvInput from './cvv-input';
import Modal from './modal'

import ApplicationAction from '../actions/application-action';
import TokenStore from '../stores/token-store';
import CartStore from '../stores/cart-store';
import ChargeStore from '../stores/charge-store';
import {getRouter} from '../stores/router-store';

export default class Vtdirect extends Component{

  static willTransitionTo(transition) {
    let products = CartStore.getCart().data
    if(products.length === 0){
      transition.redirect('/')
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      payButton: {
        disabled: false,
        text: 'Pay Now'
      },
      cartState: {
        items: CartStore.getCart().data,
        totalPrice: CartStore.getCart().totalPrice
      }
    }
  }

  componentWillMount () {
    ChargeStore.addChangeListener(this._chargeListener.bind(this))
    TokenStore.addChangeListener(this._tokenChangeListener.bind(this))
  }

  _chargeListener () {
    getRouter().transitionTo('/order')
  }

  _tokenChangeListener () {
    const token = TokenStore.getToken();
    if(token.fetched && !!!token.token_id){
      this.setState({
        payButton: {
          disabled: false,
          text: 'Pay Now'
        }
      })
    }
  }

  _handleClick () {
    ApplicationAction.setGrossAmount(CartStore.getCart().totalPrice)
    ApplicationAction.fetchToken(CartStore.getCart().totalPrice);
    this.setState({
      payButton: {
        disabled: true,
        text: 'Please wait'
      }
    })
  }

  render () {
    return (
      <div className="row">
        <Modal />
        <div className="col-md-12">
          <h2 className="no-bold">Payment</h2>
          <hr style={{borderBottom: '0px'}}/>
          <ItemTable
            items={this.state.cartState.items}
            totalPrice={this.state.cartState.totalPrice}
          />
          <h4>Credit Card Information</h4>
          <hr style={{borderBottom: '0px'}}/>
          <CardAlert />
          <div className="row">
            <div className="col-md-10 col-md-offset-1" style={{marginBottom: '20px'}}>
              <div className="row" style={{marginBottom: "10px"}}>
                <div className="col-md-6">
                  <CardInput />
                </div>
                <div className="col-md-3">
                  <ExpMonthInput />
                </div>
                <div className="col-md-3">
                  <ExpYearInput />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <CardNameInput />
                </div>
                <div className="col-md-2">
                  <CvvInput />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-block button-pay"
                    style={{marginTop: '23px'}}
                    onClick={this._handleClick.bind(this)}
                    disabled={this.state.payButton.disabled}
                  >
                    {this.state.payButton.text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
