export const buttonShowEditProfilePopup = document.querySelector('.profile__button-edit-profile');
export const buttonShowAddPhotoPopup = document.querySelector('.profile__button-add-photo');

export const overlayEditProfile = document.querySelector('.overlay-edit-profile');
export const formEditProfilePopup = overlayEditProfile.querySelector('.popup__form');

export const overlayAddPhoto = document.querySelector('.overlay-add-photo');
export const formAddPhotoPopup = overlayAddPhoto.querySelector('.popup__form');

export const inputUserName = document.querySelector('.popup__text_data_title');
export const inputUserAbout = document.querySelector('.popup__text_data_subtitle');

export const inputPhotoName = formAddPhotoPopup.querySelector('.popup__text_data_title');
export const inputPhotoLink = formAddPhotoPopup.querySelector('.popup__text_data_subtitle');

export const cardListSection = '.places';

export const avatar = document.querySelector('.profile__image');
export const linkAvatar = document.querySelector('#linkChangeAvatar');
export const overlayEditAvatar = document.querySelector('.overlay-edit-avatar');
export const formEditAvatar = overlayEditAvatar.querySelector('.popup__form');

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__text_type_error',
    errorActiveClass: 'popup__text-error_active',
};
