import { Popup } from './Popup';

export class FormPopup extends Popup {
  _create() {
    super._create();
    const form = this._view.querySelector('.popup__form');
    this._setButtonText(this._config.button.text);
    this._formValidator.setEventListeners(form);
    this._container.append(this._view);
  }

  _close = () => {
    super._close();
    this._formValidator.removeEventListeners();
  }

  _setFormData() {
    this._formData = new FormData();
    const inputsArr = Array.from(this._view.querySelector('form').elements)
      .filter((elem) => (!elem.classList.contains('button') && (elem.value)));
    inputsArr.forEach((elem) => {
      if (elem.type === 'file') {
        this._formData.append(elem.name, elem.files[0]);
      } else {
        this._formData.append(elem.name, elem.value);
      }
    });
  }

  _fillInputs = () => {
    const inputsArr = Array.from(this._view.querySelectorAll('.popup__input'));
    inputsArr.forEach((elem) => {
      const input = elem;
      input.value = this._data[elem.name];
    });
  }

  _setButtonText = (text) => {
    const button = this._view.querySelector('button');
    button.textContent = text;
  }

  _submit() {
    this._setButtonText(this._config.button.loaderText);
    this._sendDataToApi(this._formData)
      .then((obj) => {
        this._result = obj;
        this._submitAction();
      })
      .then(() => this._close())
      .catch((err) => {
        console.log(err);
        this._formValidator.setServerError(err);
        this._setButtonText(this._config.button.text);
      });
  }

  _setHandlers() {
    super._setHandlers();
    this._handlersArr.push({
      element: this._view,
      event: 'submit',
      callbacks: [this._submit],
    });
  }
}
