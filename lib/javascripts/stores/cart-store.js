import ApplicationStore from './application-store';
import ApplicationDispatcher from '../dispatchers/application-dispatcher';
import ApplicationConstant from '../constants/application-constant';
import products from './products';
import _ from 'underscore';

let _cart = {
  totalPrice: 0,
  data: []
};

function _resetCart () {
  _cart.totalPrice = 0
  _cart.data = []
}

function _addProductToCart(product_id) {
  let product = _.find(products, product =>{
    return product.id === product_id;
  });
  let productOnCart = _.find(_cart.data, product => {
    return product.id === product_id;
  })
  if (productOnCart) {
    productOnCart.quantity += 1;
    productOnCart.totalPrice = (productOnCart.quantity * productOnCart.price);
  }else{
    product.quantity = 1;
    product.totalPrice = (product.price);
    _cart.data.push(product)
  }
  _cart.totalPrice = _cart.data.reduce((prevValue, currentValue, index, array) =>{
    return prevValue + currentValue.totalPrice;
  }, 0)
}

class CartStore extends ApplicationStore{

  getCart() {
    return _cart;
  }
}


let cartStore = new CartStore();

cartStore.dispactherIndex = ApplicationDispatcher.register( actionView => {
  const controller = actionView.action;
  switch (controller.action) {
    case ApplicationConstant.ADD_TO_CART:
      _addProductToCart(controller.product_id);
      break;
    case ApplicationConstant.RESET_CART:
      _resetCart();
      break
    default:
      return;
  }
  cartStore.emitChange();
});

export default cartStore;
