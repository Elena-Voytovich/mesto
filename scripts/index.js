let overlay = document.querySelector(".overlay");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let buttonEditProfile = document.querySelector(".profile__button-edit-profile");
let popup = overlay.querySelector(".popup");
let buttonClosePopup = popup.querySelector(".popup__button-close");

let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector('.popup__text_data_title');
let jobInput = formElement.querySelector('.popup__text_data_subtitle');

function fillTextInput(name, job) {
    nameInput.value = name;
    jobInput.value = job;
}

function editProfileInfo(name, job) {
    profileTitle.textContent = name;
    profileSubtitle.textContent = job;
}

function openPopup() {
    overlay.classList.add('overlay_visible');
    fillTextInput(profileTitle.textContent, profileSubtitle.textContent);
}

function closePopup() {
    overlay.classList.remove('overlay_visible');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    editProfileInfo(nameInput.value, jobInput.value);
    closePopup();
}

buttonEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
