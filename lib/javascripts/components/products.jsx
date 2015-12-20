import React, {Component} from 'react';
import Product from './product';
import products from '../stores/products';

export default class Products extends Component{

  constructor (props) {
    super(props)
  }

  _renderProducts () {
    return products.map((product, index, array) =>{
      return (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      )
    }, this)
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          {this._renderProducts()}
        </div>
      </div>
    )
  }


}
