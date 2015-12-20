import ApplicationStore from './application-store';
import ApplicationDispatcher from '../dispatchers/application-dispatcher';
import ApplicationConstant from '../constants/application-constant';

let _modalState = {
  show: false,
  url: '',
}

function _triggerModal (url) {
  _modalState.url = url;
  _modalState.show = true;
}

function _resetModal () {
  _modalState.url = '';
  _modalState.show = false;
}

class ModalStore extends ApplicationStore{

  getModalState () {
    return _modalState;
  }
}

let modalStore = new ModalStore();


modalStore.dispatcherIndex = ApplicationDispatcher.register( actionView => {
  const controller = actionView.action;
  switch (controller.action) {
    case ApplicationConstant.TRIGGER_MODAL:
      _triggerModal(controller.url)
      break;

    case ApplicationConstant.RESET_MODAL:
      _resetModal()
      break
    default:
      return
  }
  modalStore.emitChange();
});

export default modalStore;
