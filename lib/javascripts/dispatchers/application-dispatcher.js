import {Promise} from 'es6-promise';

let _callbacks = [];
let _promises = [];

class ApplicationDispatcher {

  register (callback) {
    _callbacks.push(callback)
    return _callbacks.length - 1;
  }

  dispatch (payload) {
    let resolves = [];
    let rejects = [];

    _promises = _callbacks.map( (_, i) => {
      return new Promise( (resolve, reject) => {
        resolve[i] = resolve;
        reject[i] = reject;
      });
    });

    _callbacks.forEach( (callback, i) => {
      Promise.resolve(callback(payload)).then(() => {
        resolves[i](payload);
      }, () => {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      });
    });
    _promises = [];
  }

  handleViewAction (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

const applicationDispatcher = new ApplicationDispatcher();

export default applicationDispatcher;
