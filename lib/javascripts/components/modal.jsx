import React, {Component} from 'react';
import ModalStore from '../stores/modal-store';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class Modal extends Component{

  constructor (props) {
    super(props);
    this.state = {
      show: false,
      url: ''
    }
  }

  componentWillMount () {
    ModalStore.addChangeListener(this._listenModalStore.bind(this))
  }

  _listenModalStore () {
    let state = ModalStore.getModalState();
    this.setState(state);
  }

  _renderModal () {
    if(this.state.show) {
      return (
        <div id="3d-secure-modal" key="modal">
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-dialog" style={{width: '512px', height: '510px', padding: '15px'}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title text-center">3D Secure</h4>
                </div>
                <div className="modal-body">
                  <iframe src={this.state.url} frameBorder="0" width="450" height="420"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" style={{opacity: '0.5'}}></div>
        </div>
      )
    }else{
      return (<div></div>);
    }
  }

  render () {
    return (
      <ReactCSSTransitionGroup transitionName="fade">
        {this._renderModal()}
      </ReactCSSTransitionGroup>
    )
  }
}
