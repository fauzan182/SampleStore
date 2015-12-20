import ApplicationDispatcher from '../dispatchers/application-dispatcher';
import ApplicationConstant from '../constants/application-constant';

class ApplicationAction{

  addToCart (product_id) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.ADD_TO_CART,
      product_id: product_id
    })
  }

  setEmail (email) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_EMAIL,
      email: email
    })
  }

  setBillingAddress (billingAddress) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_BILLING_ADDRESS,
      billingAddress: billingAddress
    })
  }

  setShippingAddress (shippingAddress) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_SHIPPING_ADDRESS,
      shippingAddress: shippingAddress
    })
  }

  chargeVtWeb () {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.VTWEB
    })
  }

  setCardNo (cardNo) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_CARD_NO,
      cardNo: cardNo
    })
  }

  setCardExpMonth (expMonth) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_CARD_EXP_MONTH,
      expMonth: expMonth
    })
  }

  setCardExpYear (expYear) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_CARD_EXP_YEAR,
      expYear: expYear
    })
  }

  setCardCvv (cvv) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_CARD_CVV,
      cvv: cvv
    })
  }

  fetchToken () {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.FETCH_TOKEN
    })
  }

  setGrossAmount (grossAmount) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.SET_GROSS_AMOUNT,
      grossAmount: grossAmount
    })
  }

  triggerModal (url) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.TRIGGER_MODAL,
      url: url
    })
  }

  resetModal () {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.RESET_MODAL
    })
  }

  chargeCreditCard (token) {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.CREDIT_CARD,
      token: token
    })
  }

  resetCart () {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.RESET_CART
    })
  }

  resetCustomerDetails () {
    ApplicationDispatcher.handleViewAction({
      action: ApplicationConstant.RESET_CUSTOMER_DETAILS
    })
  }
}

const applicationAction = new ApplicationAction();

export default applicationAction;
