export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupButtonClose = this._popup.querySelector('.popup__button-close');
    }

    open() {
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
        this._popup.classList.add('overlay_visible');
    }

    close() {
        document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
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