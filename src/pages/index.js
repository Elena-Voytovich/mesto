import './index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithFormSubmit } from '../components/PopupWithFormSubmit.js';
import { api } from '../components/Api.js';

import { 
    config,
    avatar,
    cardListSection,
    buttonShowEditProfilePopup,
    buttonShowAddPhotoPopup,
    formEditProfilePopup,
    formAddPhotoPopup,
    formEditAvatar,
    inputUserName,
    inputUserAbout
} from '../utils/constants.js';

// Validation
const editProfileFormValidator = new FormValidator(config, formEditProfilePopup);
editProfileFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator(config, formAddPhotoPopup);
addPhotoFormValidator.enableValidation();

const changeAvatarValidator = new FormValidator(config, formEditAvatar);
changeAvatarValidator.enableValidation();

// Create card
function createCard(data, currentUserId) {
    const card = new Card(data, '#article-template', {
        viewImage: item => viewPhotoPopup.open(item),
        confirmDelete: () => {
            confirmPopup.setSubmitAction((evt) => {
                evt.preventDefault()
                api.deleteCard(data._id)
                    .then(() => {
                        card.remove();
                        confirmPopup.close();
                    })
                    .catch(err => console.error(err));
            });
            confirmPopup.open();
        },
        likeHandler: () => {
            if (card.liked) {
                api.deleteLike(data._id)
                    .then(json => {
                        card.setLikes(json.likes);
                    })
                    .catch(err => console.error(err));
            } else {
                api.addLike(data._id)
                    .then(json => {
                        card.setLikes(json.likes);
                    })
                    .catch(err => console.error(err));
            }
        }
    });
    card.setCurrentUser(currentUserId);
    return card.getCard();
}

// User info
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
});

// Get cards
let cardSection;

Promise.all([
        api.getUserInfo(),
        api.getCards()
    ])
    .then(([user, data]) => {
        userInfo.setUserInfo(user);
        userInfo.setAvatar(user);
        cardSection = new Section({
            items: data,
            renderer: (item) => {
                const card = createCard(item, userInfo.getId());
                cardSection.addItem(card);
            }
        }, cardListSection);

        cardSection.renderItems();
    })
    .catch(err => console.log(err));

// Profile popup
const editProfilePopup = new PopupWithForm('.overlay-edit-profile', (inputValue) => {
    editProfilePopup.renderLoading(true);

    api.updateUserInfo(inputValue)
        .then(user => {
            userInfo.setUserInfo(user);
            editProfilePopup.close();
            editProfilePopup.renderLoading(false);
        })
        .catch(err => console.error(err));
});

editProfilePopup.setEventListeners();

// Update avatar popup
const avatarPopup = new PopupWithForm('.overlay-edit-avatar', (inputValue) => {
    avatarPopup.renderLoading(true);
    api.editAvatarImage(inputValue)
        .then(user => {
            userInfo.setAvatar(user);
            avatarPopup.close();
            avatarPopup.renderLoading(false);
        })
        .catch(err => console.error(err));
});
avatarPopup.setEventListeners();

// Add photo popup
const addPhotoPopup = new PopupWithForm('.overlay-add-photo', (inputValue) => {
    addPhotoPopup.renderLoading(true);

    api.addCard(inputValue)
        .then(json => {
            return createCard(json, userInfo.getId());
        })
        .then(card => {
            cardSection.addItem(card, 'prepend');
            addPhotoPopup.close();
            addPhotoPopup.renderLoading(false);
        })
        .catch(err => console.error(err))
});

addPhotoPopup.setEventListeners();

// View photo popup
const viewPhotoPopup = new PopupWithImage('.overlay-view-photo');
viewPhotoPopup.setEventListeners();

// Update info
function handleEditProfileClick() {
    const {name, about} = userInfo.getUserInfo();

    inputUserName.value = name;
    inputUserAbout.value = about;

    editProfilePopup.open();
}

// Update avatar 
avatar.addEventListener('click', () => {
    changeAvatarValidator.disableSubmitButton();
    avatarPopup.open();
})

// Confirm popup
const confirmPopup = new PopupWithFormSubmit('.overlay-delete');
confirmPopup.setEventListeners();

buttonShowEditProfilePopup.addEventListener('click', handleEditProfileClick);
buttonShowAddPhotoPopup.addEventListener('click', () => {
    addPhotoFormValidator.disableSubmitButton();
    addPhotoPopup.open();
});
