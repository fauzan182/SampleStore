import React, {Component} from 'react';
import ApplicationAction from '../actions/application-action';


export default class ExpMonthIntput extends Component {

  constructor (props) {
    super(props)
  }

  _handleChange (e) {
    ApplicationAction.setCardExpMonth(e.target.value);
  }

  render () {
    let defaultValue = ("0" + (new Date().getMonth())).slice(-2)
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" style={{minHeight: '0px'}}>
              <label>Card Exp Month</label>
            </div>
          </div>
          <select className="form-control" defaultValue={defaultValue} onChange={this._handleChange.bind(this)}>
            <option value="01">01-Jan</option>
            <option value="02">02-Feb</option>
            <option value="03">03-Mar</option>
            <option value="04">04-Apr</option>
            <option value="05">05-Mei</option>
            <option value="06">06-Jun</option>
            <option value="07">07-Jul</option>
            <option value="08">08-Aug</option>
            <option value="09">09-Sep</option>
            <option value="10">10-Okt</option>
            <option value="11">11-Nov</option>
            <option value="12">12-Dec</option>
          </select>
        </div>
      </div>
    )
  }
}
