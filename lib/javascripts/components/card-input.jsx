import React, {Component} from 'react';
import ApplicationAction from '../actions/application-action';

const stylesheets = {
  icn: {
    right: '0',
    marginRight: '10px',
    position: 'absolute',
    padding: '10px 22px',
    marginTop: '6px',
    pointerEvents: 'none'
  }
}

const principals = [
  {
    type: "visa",
    pattern: /^4/
  },
  {
    type: "mastercard",
    pattern: /^5[1-5]/
  },
  {
    type: "bni",
    pattern: /^19/
  },
  {
    type: "jcb",
    pattern: /^35/
  }
];

function removeSpace(value) {
  return value.replace(/\D/g, "");
}

function detectPrincipal(value) {
  for (let i=0; i < principals.length; i++) {
    if (principals[i].pattern.test(value)) {
      return principals[i].type;
    }
  }

  return null;
}

function detectPrincipal(value) {
  for (let i=0; i < principals.length; i++) {
    if (principals[i].pattern.test(value)) {
      return principals[i].type;
    }
  }

  return null;
}

function formatByFour(str, addEndSpace) {
  if (!str)
    return '';

  let strArr = str.replace(/\D/g, '').match(/.{1,4}/g);
  let newStr = strArr.join(" ");

  if (addEndSpace && strArr[strArr.length - 1].length == 4)
    newStr += " ";

  return newStr.slice(0, 19);
}

export default class CardInput extends Component{

  constructor (props) {
    super(props);
    this.state = {
      cardType: "visa"
    }
  }

  _handleKeyDown (e) {
    let elm = e.target || e.srcElement;
    let keyCode = e.which || e.keyCode;
    let value = elm.value;

    if ([9, 37, 39].indexOf(keyCode) == -1) {
      e.preventDefault();

      let cursorStart = elm.selectionStart;
      let cursorEnd = elm.selectionEnd;

      if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {

        let charValue = String.fromCharCode((keyCode >= 96 && keyCode <= 105) ? keyCode - 48 : keyCode);

        value = value.slice(0, cursorStart) + charValue + value.slice(cursorEnd);
        value = formatByFour(value, true);

        cursorStart += 1;

        if (value[cursorStart] === " " || value[cursorStart - 1] === " ")
          cursorStart += 1;

      } else if (keyCode == 8) {

        let indexStart = (cursorStart === cursorEnd) ? cursorStart - 1 : cursorStart;

        value = value.slice(0, indexStart) + value.slice(cursorEnd);
        value = formatByFour(value);

        if (cursorStart == cursorEnd)
          cursorStart -= 1;
      }

      elm.value = value;
      elm.selectionStart = cursorStart;
      elm.selectionEnd = cursorStart;
    }
    var cardValue = removeSpace(value);

    this.setState({
      cardType: detectPrincipal(cardValue)
    });
    ApplicationAction.setCardNo (cardValue);
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" style={{minHeight: '0px'}}>
              <label>Card Number</label>
            </div>
          </div>
          <div style={{position: 'relative'}}>
            <i style={stylesheets.icn} className={(this.state.cardType ? this.state.cardType : '')}></i>
            <input
              className="form-control"
              type="tel"
              maxLength={22}
              size={22} 
              onKeyDown={this._handleKeyDown.bind(this)}
              defaultValue="4811 1111 1111 1114"
            />
          </div>
        </div>
      </div>
    )
  }

}
