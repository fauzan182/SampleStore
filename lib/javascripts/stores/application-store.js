import EventEmitter from 'events';

const EVENT = 'change';

export default class ApplicationStore extends EventEmitter{

  constructor () {
    super()
  }

  addChangeListener (callback) {
    this.on(EVENT, callback)
  }

  removeChangeListener (callback) {
    this.removeListener(EVENT, callback)
  }

  emitChange () {
    this.emit(EVENT)
  }
}

ApplicationStore.dispactherIndex = null;
