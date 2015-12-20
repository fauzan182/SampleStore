import React, {Component} from 'react';

export default class Input extends Component{

  constructor (props) {
    super(props)
  }

  _layout () {
    let inputClass = {
      labelOfset: 0,
      inputSpan: 12,
    }
    if (this.props.span == 0 || this.props.span == 12) {
      return inputClass;
    }else if(this.props.ofset){
      inputClass.labelOfset =  this.props.ofset
      inputClass.inputSpan = this.props.span
    }else{
      inputClass.labelOfset = (12 - this.props.span);
      inputClass.inputSpan = this.props.span
    }
    return inputClass;
  }

  _label () {
    const ofset = this._layout().labelOfset
    if ( ofset === 0) {
      return "";
    }else{
      return (
        <label className={`col-sm-${ofset} control-label`}>{this.props.label}</label>
      )
    }
  }

  _input () {
    return(
      <div className={`col-sm-${this._layout().inputSpan}`}>
        <input
          type={this.props.type}
          className="form-control"
          placeholder={this.props.placeholer}
          defaultValue={this.props.defaultValue}
          ref="input"
          onChange={this._handleChange.bind(this)}
        />
      </div>
    )
  }

  _handleChange () {
    let value = this.refs.input.getDOMNode().value;
    this.props.onChange(value);
  }

  render () {
    return (
      <div className="form-group">
        {this._label()}
        {this._input()}
      </div>
    )
  }
}
