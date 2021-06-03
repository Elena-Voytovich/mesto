export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    _hideInputError = (inputElement, formElement, { inputErrorClass, errorActiveClass }) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorActiveClass);
        errorElement.textContent = '';
    }
    
    _showInputError = (inputElement, formElement, { inputErrorClass, errorActiveClass }) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorActiveClass);
    }
    
    _checkInputValidity = (inputElement, formElement, config) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, formElement, config);
        } else {
            this._showInputError(inputElement, formElement, config);
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
    
    _setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);
    
        this._toggleButtonState(buttonElement, inputList);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement, formElement, restConfig);
                this._toggleButtonState(buttonElement, inputList);
            });
        })
    }

    // hideDefaultInputErrors() {
    //     const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    //     inputList.forEach((inputElement) => {
    //         this._hideInputError(inputElement, this._form, this._config);
    //     });

    //     const buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    //     this._toggleButtonState(buttonElement, inputList);
    // }

    enableValidation() {
        this._setEventListeners(this._form, this._config);
    }
}
