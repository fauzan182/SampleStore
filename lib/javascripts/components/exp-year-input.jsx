import React, {Component} from 'react';
import ApplicationAction from '../actions/application-action';


export default class ExpYearInput extends Component{

  constructor (props) {
    super(props);
  }

  _renderYearOptions() {
    let data = [];
    let year = new Date().getFullYear()
    for (let i=0; i <= 5; i++){
      let currValue = (i+year)
      data.push(
        <option key={currValue} value={currValue}>{currValue}</option>
      )
    }
    return data;
  }

  _handleChange (e) {
    ApplicationAction.setCardExpYear(e.target.value);
  }

  render () {
    let defaultValue = ((new Date().getFullYear()) + 1)
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" style={{minHeight: '0px'}}>
              <label>Card Exp Year</label>
            </div>
          </div>
          <select className="form-control" value={defaultValue} onChange={this._handleChange.bind(this)}>
            {this._renderYearOptions()}
          </select>
        </div>
      </div>
    )
  }
}
