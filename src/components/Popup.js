export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupButtonClose = this._popup.querySelector('.popup__button-close');
        this._onEsc = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._onEsc);
        this._popup.classList.add('overlay_visible');
        this._popup.focus();
    }

    close() {
        document.removeEventListener('keydown', this._onEsc);
        this._popup.classList.remove('overlay_visible');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('mousedown', (evt) => {
            this._handleOverlayClose(evt);
        });
    }
}