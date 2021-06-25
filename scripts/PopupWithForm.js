import { Popup } from "./Popup.js";
import { config } from "./constants.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, sumbitCallback) {
        super(popupSelector);
        const { formSelector } = config;
        this._submitCallback = sumbitCallback;
        this._form = this._popup.querySelector(formSelector);
    }

    _getInputValues() {
        const { inputSelector } = config;
        const inputList = this._form.querySelectorAll(inputSelector);
        const value = {};
        inputList.forEach((input) => {
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