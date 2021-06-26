import { Popup } from "./Popup.js";
import { config } from "./constants.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, sumbitCallback) {
        super(popupSelector);
        const { inputSelector, formSelector } = config;
        this._submitCallback = sumbitCallback;
        this._form = this._popup.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(inputSelector);
    }

    _getInputValues() {
        const value = {};
        this._inputList.forEach((input) => {
            value[input.name] = input.value;
        })

        return value;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}