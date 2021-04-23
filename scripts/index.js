let overlay = document.querySelector(".overlay");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let buttonEditProfile = document.querySelector(".profile__button-edit-profile");
let popup = overlay.querySelector(".popup");
let buttonClosePopup = popup.querySelector(".popup__button-close");

let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector('.popup__text_data_title');
let jobInput = formElement.querySelector('.popup__text_data_subtitle');

function openPopup() {
    overlay.classList.add('overlay_visible');
}

function closePopup() {
    overlay.classList.remove('overlay_visible');
}

function editProfileHandler(evt) {
    evt.preventDefault();
    openPopup();
    fillTextInput(profileTitle.textContent, profileSubtitle.textContent);
}

function closePopupHandler(evt) {
    evt.preventDefault();
    closePopup();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    editProfileInfo(nameInput.value, jobInput.value);
    closePopup();
}

function fillTextInput(name, job) {
    nameInput.value = name;
    jobInput.value = job;
}

function editProfileInfo(name, job) {
    profileTitle.textContent = name;
    profileSubtitle.textContent = job;
}

buttonEditProfile.addEventListener('click', editProfileHandler);
buttonClosePopup.addEventListener('click', closePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
