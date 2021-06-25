export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
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
    
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    
    _toggleButtonState = (buttonElement, inputList) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }
    
    _setEventListeners = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            buttonElement.disabled = true;
        });
    
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    
        this._toggleButtonState(buttonElement, inputList);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(buttonElement, inputList);
            });
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}
