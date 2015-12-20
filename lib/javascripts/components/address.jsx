import React, {Component} from 'react'

export default class Address extends Component{

  constructor (props) {
    super(props)
  }

  _fullName () {
    return `${this.props.firstName} ${this.props.lastName}`
  }

  _address () {
    return `${this.props.address} ${this.props.city} ${this.props.postalCode}`
  }

  render () {
    return (
      <table className="table table-condensed">
        <tr>
          <td>Name</td>
          <td>{this._fullName()}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{this._address()}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{this.props.phone}</td>
        </tr>
      </table>
    )
  }
}
