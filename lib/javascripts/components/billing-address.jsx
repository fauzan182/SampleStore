import React, {Component} from 'react';
import Input from './input';
import ApplicationAction from '../actions/application-action';
import CustomerDetailsStore from '../stores/customer-details-store';

export default class BillingAddress extends Component{

  constructor (props) {
    super(props);
    this.state = CustomerDetailsStore.getBillingAddress();
  }

  _handleFirstNameChange (value){
    this.setState({first_name: value})
    ApplicationAction.setBillingAddress(this.state);
  }

  _handleLastNameChange (value){
    this.setState({last_name: value})
    ApplicationAction.setBillingAddress(this.state);
  }

  _handleAddressChange (value){
    this.setState({address: value})
    ApplicationAction.setBillingAddress(this.state);
  }

  _handleCityChange (value){
    this.setState({city: value})
    ApplicationAction.setBillingAddress(this.state);
  }

  _handlePostalCodeChange (value){
    this.setState({postal_code: value})
    ApplicationAction.setBillingAddress(this.state);
  }

  _handlePhoneChange (value){
    this.setState({phone: value})
    ApplicationAction.setBillingAddress(this.state);
  }

  render () {
    return (
      <div className="col-md-6">
        <h4 className="no-bold">Billing Info</h4>
        <hr style={{marginTop: '0px'}}/>
        <div className="form-horizontal">
          <Input
            span={8}
            label="First Name"
            type="text"
            placeholder="First Name"
            defaultValue={this.state.first_name}
            onChange={this._handleFirstNameChange.bind(this)}
          />
          <Input
            span={8}
            label="Last Name"
            type="text"
            placeholder="Last Name"
            defaultValue={this.state.last_name}
            onChange={this._handleLastNameChange.bind(this)}
          />
          <Input
            span={8}
            label="Address"
            type="text"
            placeholder="Address"
            defaultValue={this.state.address}
            onChange={this._handleAddressChange.bind(this)}
          />
          <Input
            span={8}
            label="City"
            type="text"
            placeholder="City"
            defaultValue={this.state.city}
            onChange={this._handleCityChange.bind(this)}
          />
          <Input
            span={8}
            label="Postal Code"
            type="text"
            placeholder="Postal Code"
            defaultValue={this.state.postal_code}
            onChange={this._handlePostalCodeChange.bind(this)}
          />
          <Input
            span={8}
            label="Phone"
            type="text"
            placeholder="Phone"
            defaultValue={this.state.phone}
            onChange={this._handlePhoneChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}
