import React, {Component} from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Header from './components/header';
import Footer from './components/footer';
import Products from './components/products';
import Alert from './components/alert';
import Carts from './components/carts';
import Checkout from './components/checkout';
import Vtdirect from './components/vtdirect';
import Order from './components/order';
import CartStore from './stores/cart-store';
import {setRouter} from './stores/router-store';


class Application extends Component{

  constructor (props) {
    super(props)
    this.state = {
      alert: {
        show: false,
        text: '',
        type: ''
      }
    }
  }

  componentWillMount () {
    CartStore.addChangeListener(this._cartChangeListener.bind(this))
  }

  _cartChangeListener () {
    this.setState({
      alert: {
        show: true,
        text: "Successfuly add product to cart",
        type: 'success'
      }
    });
    this._resetAlert();
  }

  _resetAlert () {
    setTimeout( ()=> {
      this.setState({
        alert: {
          show: false,
          text: "",
          type: ''
        }
      });
    }, 1500)
  }

  _renderAlert() {
    if(this.state.alert.show){
      return (
        <Alert key="alert" text={this.state.alert.text} type={this.state.alert.type} />
      )
    }else{
      return "";
    }
  }


  render () {
    return (
      <div id="application">
        <Header />
        <div id="main" className="container">
          <RouteHandler />
        </div>
        <Footer />
        {this._renderAlert()}
      </div>
    )
  }
}

const routes = (
  <Route handler={Application}>
    <Route path="/" handler={Products} />
    <Route path="/carts" handler={Carts} />
    <Route path="/checkout" handler={Checkout} />
    <Route path="/vtdirect" handler={Vtdirect} />
    <Route path="/order" handler={Order} />
  </Route>
);

const router = Router.create({
  routes: routes,
  location: Router.HashLocation
})

router.run( Location => {
  setRouter(router)
  React.render(<Location />, document.body);
})

