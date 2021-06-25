import { cardsInfo, cardListSection, config } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';

const buttonShowEditProfilePopup = document.querySelector('.profile__button-edit-profile');
const buttonShowAddPhotoPopup = document.querySelector('.profile__button-add-photo');

const overlayEditProfile = document.querySelector('.overlay-edit-profile');
const formEditProfilePopup = overlayEditProfile.querySelector('.popup__form');

const overlayAddPhoto = document.querySelector('.overlay-add-photo');
const formAddPhotoPopup = overlayAddPhoto.querySelector('.popup__form');

const inputUserName = document.querySelector('.popup__text_data_title');
const inputUserJob = document.querySelector('.popup__text_data_subtitle');

const inputPhotoName = formAddPhotoPopup.querySelector('.popup__text_data_title');
const inputPhotoLink = formAddPhotoPopup.querySelector('.popup__text_data_subtitle');

// Validation
const editProfileFormValidator = new FormValidator (config, formEditProfilePopup);
editProfileFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator (config, formAddPhotoPopup);
addPhotoFormValidator.enableValidation();

// Profile popup
const editProfilePopup = new PopupWithForm('.overlay-edit-profile', () => {
    const data = {
        name: inputUserName.value,
        job: inputUserJob.value
    }
    userInfo.setUserInfo(data);
    editProfilePopup.close();
});

editProfilePopup.setEventListeners();

// User info
const userInfo = new UserInfo({
    nameSelector: '.profile__title', 
    jobSelector: '.profile__subtitle'
});

// Add photo popup
const addPhotoPopup = new PopupWithForm('.overlay-add-photo', () => {
    const cardInfo = { 
        name: inputPhotoName.value, 
        link: inputPhotoLink.value 
    };

    const card = new Card (cardInfo, '#article-template', item => viewPhotoPopup.open(item));
    cardList.addItem(card.getCard());

    addPhotoPopup.close();
});

addPhotoPopup.setEventListeners();

// View photo popup
const viewPhotoPopup = new PopupWithImage('.overlay-view-photo');
viewPhotoPopup.setEventListeners();

// Card list
const cardList = new Section ({
    items: cardsInfo,
    renderer: (item) => {
        const card = new Card (item, '#article-template', item => viewPhotoPopup.open(item));
        cardList.addItem(card.getCard());
    }
}, cardListSection)

cardList.renderItems();

// Update info
function handleEditProfileClick() {
    const {name, job} = userInfo.getUserInfo();

    inputUserName.value = name;
    inputUserJob.value = job;

    editProfilePopup.open();
}

buttonShowEditProfilePopup.addEventListener('click', handleEditProfileClick);
buttonShowAddPhotoPopup.addEventListener('click', () => {
    addPhotoPopup.open();
});
