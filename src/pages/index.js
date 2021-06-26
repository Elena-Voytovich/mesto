import './index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

import { 
    config,
    cardsInfo,
    cardListSection,
    buttonShowEditProfilePopup,
    buttonShowAddPhotoPopup,
    formEditProfilePopup,
    formAddPhotoPopup,
    inputUserName,
    inputUserJob,
    inputPhotoName,
    inputPhotoLink 
} from '../components/constants.js';

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

// Create card
function createCard(item) {
    const card = new Card (item, '#article-template', item => viewPhotoPopup.open(item));
    return card.getCard();
}

// Add photo popup
const addPhotoPopup = new PopupWithForm('.overlay-add-photo', () => {
    const item = { 
        name: inputPhotoName.value, 
        link: inputPhotoLink.value 
    };

    cardList.addItem(createCard(item));

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
        cardList.addItem(createCard(item));
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
    console.log('enabled');
    addPhotoFormValidator.disableSubmitButton();
    addPhotoPopup.open();
});
