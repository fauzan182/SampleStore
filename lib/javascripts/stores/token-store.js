import ApplicationStore from './application-store';
import ApplicationDispatcher from '../dispatchers/application-dispatcher';
import ApplicationConstant from '../constants/application-constant';
import ApplicationAction from '../actions/application-action';

let _token = {
  token_id: null,
  fetched: false,
}
let _deviceId = null;

let _cardData = {
  card_number: '4811111111111114',
  card_exp_month: (('0' + (new Date().getMonth())).slice(-2)),
  card_exp_year: ((new Date().getFullYear()) + 1),
  card_cvv: '123',
  secure: true,
  gross_amount: 0
}

function _card () {
  return _cardData;
}

function _fetchToken (callback) {
  Veritrans.url = 'https://api.sandbox.veritrans.co.id/v2/token';
  Veritrans.client_key = 'VT-client-Blc2CzR_VFF__Gyo';
  Veritrans.token(_card, callback)
}

function _setGrossAmount (grossAmount) {
  _cardData.gross_amount = grossAmount;
}

function _setCardNumber (number) {
  _cardData.card_number = number;
}

function _setCardExpMonth (expMonth) {
  _cardData.card_exp_month = expMonth;
}

function _setCardExpYear (expYear) {
  _cardData.card_exp_year = expYear;
}

function _setCardCvv (cvv) {
  _cardData.card_cvv = cvv;
}

class TokenStore extends ApplicationStore{

  getToken () {
    return _token;
  }

  getDeviceId () {
    return _deviceId;
  }
}

let tokenStore = new TokenStore();

tokenStore.dispactherIndex = ApplicationDispatcher.register( actionView => {
  const controller = actionView.action;
  switch (controller.action) {
    case ApplicationConstant.SET_CARD_NO:
      _setCardNumber(controller.cardNo);
      tokenStore.emitChange();
      break;
    case ApplicationConstant.SET_CARD_EXP_MONTH:
      _setCardExpMonth(controller.expMonth);
      tokenStore.emitChange();
      break;
    case ApplicationConstant.SET_CARD_EXP_YEAR:
      _setCardExpYear(controller.expYear);
      tokenStore.emitChange();
      break
    case ApplicationConstant.SET_CARD_CVV:
      _setCardCvv(controller.cvv);
      tokenStore.emitChange();
      break
    case ApplicationConstant.FETCH_TOKEN:
      _fetchToken( response => {
        if(response.redirect_url){
          _token.fetched = false;
          ApplicationAction.triggerModal(response.redirect_url)
        }else if(response.status_code === '200'){
          _token.fetched = true;
          _token.token_id = response.token_id;
          ApplicationAction.resetModal();
          ApplicationAction.chargeCreditCard(_token.token_id)
        }else{
          _token.fetched = true;
          ApplicationAction.resetModal();
        }
        tokenStore.emitChange();
      });
      break
    case ApplicationConstant.SET_GROSS_AMOUNT:
      _setGrossAmount(controller.grossAmount);
      break
    default:
      return
  }
})

export default tokenStore;
