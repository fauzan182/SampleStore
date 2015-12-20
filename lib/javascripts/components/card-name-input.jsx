import React, {Component} from 'react';

export default class CardNameInput extends Component{

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" style={{minHeight: '0px'}}>
              <label>Name On Card</label>
            </div>
          </div>
          <input
            className="form-control"
            type="text"
            defaultValue="John Doe"
          />
        </div>
      </div>
    )
  }
}
