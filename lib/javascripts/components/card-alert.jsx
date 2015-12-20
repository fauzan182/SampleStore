import React, {Component} from 'react';


export default class CardAlert extends Component{

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="col-md-10 col-md-offset-1">
        <div className="alert alert-success">
          <div className="row">
            <div className="col-md-1">
              <h1 className="glyphicon glyphicon-info-sign"></h1>
            </div>
            <div className="col-md-11">
              <small>
                Please use one of this dummy Credit Card number,
                <br />
                <b>4811 1111 1111 1114 </b>
                (Visa) or 
                <b> 5211 1111 1111 1117 </b>
                (MasterCard),
                <br />
                and for
                <b> cvv </b>
                just insert any three digits number. this is just for testing purpose, nothing will be charged.
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
