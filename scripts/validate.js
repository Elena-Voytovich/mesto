const hideInputError = (inputElement, formElement, { inputErrorClass, errorActiveClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorActiveClass);
    errorElement.textContent = '';
}

const showInputError = (inputElement, formElement, { inputErrorClass, errorActiveClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorActiveClass);
}

const checkInputValidity = (inputElement, formElement, config) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, formElement, config);
    } else {
        showInputError(inputElement, formElement, config);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(buttonElement, inputList);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, formElement, restConfig);
            toggleButtonState(buttonElement, inputList);
        });
    })
}

const enableValidation = ({ formSelector, ...restConfig }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
};
