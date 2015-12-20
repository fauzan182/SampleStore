import React, {Component} from 'react';
import ApplicationAction from '../actions/application-action';

export default class CvvInput extends Component{

  constructor (props) {
    super(props)
  }

  _handleChange (e) {
    ApplicationAction.setCardCvv(e.target.value);
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" style={{minHeight: '0px'}}>
              <label>CVV</label>
            </div>
          </div>
          <input
            className="form-control"
            type="password"
            maxLength={5}
            size={5}
            defaultValue={123}
            onChange={this._handleChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}
