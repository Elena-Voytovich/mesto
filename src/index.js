import './pages/index.css';
import { Card } from './scripts/Card';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';

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
} from './scripts/constants.js';

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
