export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorActiveClass);
        errorElement.textContent = '';
    }
    
    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorActiveClass);
    }
    
    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }
    
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButton.disabled = true;
        } else {
            this._submitButton.disabled = false;
        }
    }

    disableSubmitButton() {
        this._submitButton.disabled = true;
    } 
    
    _setEventListeners = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.disabled = true;
        });
    
        this._toggleButtonState();
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}
