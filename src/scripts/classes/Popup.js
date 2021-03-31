import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  open = (data) => {
    this._data = data;
    this._create();
    if (Object.prototype.hasOwnProperty.call(this, 'updateInformation') && (data)) {
      // Если у попапа есть свойство для обновления данных в полях и эти данные пришли;
      this.updateInformation(data);
    }
    this._setHandlers();
    this._setEventListeners();
    this._blockScroll();
    this._container.classList.add('popup_is-opened');
  }

  _close() {
    this._container.classList.remove('popup_is-opened');
    this._removeEventListeners();
    this._view.remove();
    this._unBlockScroll();
  }

  _blockScroll = () => {
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    this._scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    document.body.setAttribute('style', `padding-right: ${this._scrollWidth}px`);
    document.body.style.overflow = 'hidden';
  }

  _unBlockScroll = () => {
    document.body.removeAttribute('style', `padding-right: ${this._scrollWidth}px`);
    document.body.style.overflow = '';
  }

  _create() {
    this._view = this._template.content.cloneNode(true).children[0];
    // this._container.append(this._view);
  }

  _setHandlers() {
    const closeBtn = this._view.querySelector('.popup__close');
    this._handlersArr = [
      {
        element: closeBtn,
        event: 'click',
        callbacks: [this._close],
      },
      {
        element: document,
        event: 'keydown',
        callbacks: [this._closeByEsc],
      },
      {
        element: this._container,
        event: 'click',
        callbacks: [this._closeByOverlay],
      },
    ];
    return this._handlersArr;
  }

  _closeByEsc = (event) => {
    if (event.keyCode === 27) {
      this._close();
    }
  };

  _closeByOverlay = (event) => {
    if (event.target === this._container) {
      this._close();
    }
  };
}
