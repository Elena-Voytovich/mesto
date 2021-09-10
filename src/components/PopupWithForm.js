import { Popup } from "./Popup.js";
import { config } from "./constants.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, sumbitCallback) {
        super(popupSelector);
        const { inputSelector, formSelector } = config;
        this._submitCallback = sumbitCallback;
        this._form = this._popup.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(inputSelector);
        this._submitButton = this._popup.querySelector('.popup__button-save');
        this._submitButtonText = this._submitButton.textContent;
    }

    renderLoading(isLoading) {
        if (isLoading === true) {
          this._submitButton.textContent = 'Сохранение...';
        } else {
          this._submitButton.textContent = this._submitButtonText;
        }
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