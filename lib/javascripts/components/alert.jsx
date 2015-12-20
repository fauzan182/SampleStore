import React, {Component} from 'react';

const stylesheets = {
  alert: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: "100%",
    marginBottom: "0px",
    borderRadius: 0
  }


}

export default class Alert extends Component{


  _alertType() {
    let type = '';
    switch (this.props.type) {
      case 'success':
        type = "alert-success";
        break;
      case 'error':
        type = "alert-danger";
        break;
      case 'warning':
        type = "alert-warning";
        break;
      case 'info':
        type = "alert-info";
        break;
      default:
        type = "alert-info";
    }
    return type;
  }

  render () {
    return (
      <div style={stylesheets.alert} className={"alert " + this._alertType()} id="alert">
        <div className="container">
          <p style={{marginBottom: 0}} className="text-center">
            {this.props.text}
          </p>
        </div>
      </div>
    )
  }
}
