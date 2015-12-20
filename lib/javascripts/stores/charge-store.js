import ApplicationStore from './application-store';
import ApplicationDispatcher from '../dispatchers/application-dispatcher';
import ApplicationConstant from '../constants/application-constant';
import CartStore from './cart-store';
import CustomerDetailsStore from './customer-details-store';
import axios from 'axios';

let _chargeResponse = {};

function _charge (chargeParams) {
  return axios({
    url: '/charge',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: JSON.stringify(chargeParams)
  })
}

function _defaultChargeParams () {
  return {
    transaction_details: {
      order_id: (Math.round(+new Date()/1000)),
      gross_amount: CartStore.getCart().totalPrice
    },
    item_details: CartStore.getCart().data,
    customer_details: CustomerDetailsStore.getCustomerDetails()
  }
}

function _chargeVtWeb () {
  let chargeParams = _defaultChargeParams()
  chargeParams.payment_type = 'vtweb';
  chargeParams.vtweb = {
    credit_card_3d_secure: true
  }
  return _charge(chargeParams);
}

function _chargeCreditCard (token) {
  let chargeParams = _defaultChargeParams()
  chargeParams.payment_type = 'credit_card';
  chargeParams.credit_card = {
    token_id: token
  }
  return _charge(chargeParams);
}

class ChargeStore extends ApplicationStore{

  getVtwebResponse () {
    return _chargeResponse;
  }

  getVtDirectResponse () {
    return _chargeResponse;
  }
}

let chargeStore = new ChargeStore();

chargeStore.dispactherIndex = ApplicationDispatcher.register( actionView => {
  const controller = actionView.action;
  switch (controller.action) {
    case ApplicationConstant.VTWEB:
      _chargeVtWeb()
        .then( response => {
          _chargeResponse = response.data;
          window.location.href = response.data.redirect_url;
          chargeStore.emitChange();
        })
      break;
    case ApplicationConstant.CREDIT_CARD:
      _chargeCreditCard(controller.token)
        .then( response => {
          console.log(response.data)
          _chargeResponse = response.data;
          chargeStore.emitChange();
        })
      break;
    default:
      return
  }
})
export default chargeStore;
