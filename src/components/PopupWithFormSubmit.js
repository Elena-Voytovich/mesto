import { Popup } from "./Popup.js";

export class PopupWithFormSubmit extends Popup {
    constructor(elementSelector) {
        super(elementSelector);
    }

    setSubmitAction(action) {
        this._handleSubmit = action;
    }

    open() {
        super.open();
        this._popup.addEventListener('submit', this._handleSubmit);
    }

    close() {
        super.close();
        this._popup.removeEventListener('submit', this._handleSubmit);
    }
}
