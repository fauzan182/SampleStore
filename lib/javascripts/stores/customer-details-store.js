import ApplicationStore from './application-store';
import ApplicationDispatcher from '../dispatchers/application-dispatcher';
import ApplicationConstant from '../constants/application-constant';

let _customerDetails = {
  first_name: 'Mid',
  last_name: 'Trans',
  email: "vt-testing@veritrans.co.id",
  phone: '62 21 573 6789',
  billing_address: {
    first_name: 'Mid',
    last_name: 'Trans',
    address: 'Midplaza 2, 24, JL. Jendral Sudirman Kav. 10.11',
    city: 'Jakarta',
    postal_code: '10220',
    phone: '62 21 573 6789',
  },
  shipping_address: {
    first_name: 'Mid',
    last_name: 'Trans',
    address: 'Midplaza 2, 24, JL. Jendral Sudirman Kav. 10.11',
    city: 'Jakarta',
    postal_code: '10220',
    phone: '62 21 573 6789',
  }
};

function _setEmail (email) {
  _customerDetails.email = email;
}

function _setBillingAddress (billingAddress) {
  for(let address in billingAddress){
    _customerDetails[address] = billingAddress[address]
    _customerDetails.billing_address[address] = billingAddress[address]
  }
}

function _setShippingAddress (shippingAddress) {
  for(let address in shippingAddress){
    _customerDetails.shipping_address[address] = shippingAddress[address]
  }
}

function _resetCustomerDetails () {
  _customerDetails = {
    first_name: 'Mid',
    last_name: 'Trans',
    email: "vt-testing@veritrans.co.id",
    phone: '62 21 573 6789',
    billing_address: {
      first_name: 'Mid',
      last_name: 'Trans',
      address: 'Midplaza 2, 24, JL. Jendral Sudirman Kav. 10.11',
      city: 'Jakarta',
      postal_code: '10220',
      phone: '62 21 573 6789',
    },
    shipping_address: {
      first_name: 'Mid',
      last_name: 'Trans',
      address: 'Midplaza 2, 24, JL. Jendral Sudirman Kav. 10.11',
      city: 'Jakarta',
      postal_code: '10220',
      phone: '62 21 573 6789',
    }
  };
}

class CustomerDetails extends ApplicationStore{

  getCustomerDetails() {
    return _customerDetails;
  }

  getBillingAddress() {
    return _customerDetails.billing_address;
  }

  getShippingAddress() {
    return _customerDetails.shipping_address;
  }

  getEmail() {
    return _customerDetails.email;
  }
}

let customerDetails = new CustomerDetails()

customerDetails.dispatchersIndex = ApplicationDispatcher.register( actionView => {
  const controller = actionView.action;
  switch (controller.action) {
    case ApplicationConstant.SET_EMAIL:
      _setEmail(controller.email)
      break;
    case ApplicationConstant.SET_BILLING_ADDRESS:
      _setBillingAddress(controller.billingAddress)
      break;
    case ApplicationConstant.SET_SHIPPING_ADDRESS:
      _setBillingAddress(controller.shippingAddress)
      break;
    case ApplicationConstant.RESET_CUSTOMER_DETAILS:
      _resetCustomerDetails()
      break;
    default:
      return;
  }
  customerDetails.emitChange();
});

export default customerDetails;
