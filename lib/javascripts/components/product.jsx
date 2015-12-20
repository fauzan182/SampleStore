import React, {Component} from 'react';
import accounting from 'accounting';
import ApplicationAction from '../actions/application-action';

const stylesheets = {
  product: {
    width: "33%",
    float: 'left'
  },
  inner: {
    position: 'relative',
    minHeight: '200px',
    padding: '15px',
    margin: '10px',
    border: '1px solid #ccc'
  },
  name: {
    fontSize: '16px'
  },
  image: {
    marginTop: '20px',
    width: '200px',
    height: '200px'
  },
  img: {
    maxWidth: '100%',
    width: 'auto\9',
    height: 'auto',
    verticalAlign: 'middle',
    border: '0'
  }
}

export default class Product extends Component{

  constructor (props) {
    super(props)
  }

  _handleClick () {
    ApplicationAction.addToCart(this.props.id);
  }

  render () {
    return(
      <div style={stylesheets.product}>
        <div style={stylesheets.inner}>
          <div style={stylesheets.name}>
            <h4>{this.props.name}</h4>
            <div>{accounting.formatMoney(this.props.price, "Rp ", 0, ".", '')}</div>
          </div>
          <div style={stylesheets.image}>
            <img style={stylesheets.img} src={this.props.image} alt={this.props.name} />
          </div>
          <button className="btn buy-button" onClick={this._handleClick.bind(this)}>Buy</button>
        </div>
      </div>
    )
  }
}
