import React, {Component} from 'react';


export default class Footer extends Component{

  constructor (props) {
    super(props)
    let year = new Date().getFullYear();
    this.state = {year: year}
  }

  render () {
    return (
      <div id="footer" className="container">
        <div className="row">
          <div className="col-md-12">
            <hr style={{marginTop: "0px"}}/>
            <small>&copy; {this.state.year} PT Midtrans (Veritrans Indonesia). All Rights Reserved</small>
          </div>
        </div>
      </div>
    )
  }
}
