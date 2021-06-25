import maldivesImage from '../images/photo-maldives.jpg';
import indonesiaImage from '../images/photo-indonesia.jpg';
import spainImage from '../images/photo-spain.jpg';
import chongqingImage from '../images/photo-chongqing.jpg';
import norwayImage from '../images/photo-norway.jpg';
import portugalImage from '../images/photo-portugal.jpg';

export const cardsInfo = [
    {
        name: 'Thaa, Maldives',
        link: maldivesImage
    },
    {
        name: 'Bali, Indonesia',
        link: indonesiaImage
    },
    {
        name: 'Calle Niño de Guevara',
        link: spainImage
    },
    {
        name: 'Chongqing, 重庆市中国',
        link: chongqingImage
    },
    {
        name: 'Åndalsnes, Norway',
        link: norwayImage
    },
    {
        name: 'Ponte 25 de Abril, Lisboa, Portugal',
        link: portugalImage
    }
];

export const cardListSection = '.places';

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__text_type_error',
    errorActiveClass: 'popup__text-error_active',
};

export const buttonShowEditProfilePopup = document.querySelector('.profile__button-edit-profile');
export const buttonShowAddPhotoPopup = document.querySelector('.profile__button-add-photo');

export const overlayEditProfile = document.querySelector('.overlay-edit-profile');
export const formEditProfilePopup = overlayEditProfile.querySelector('.popup__form');

export const overlayAddPhoto = document.querySelector('.overlay-add-photo');
export const formAddPhotoPopup = overlayAddPhoto.querySelector('.popup__form');

export const inputUserName = document.querySelector('.popup__text_data_title');
export const inputUserJob = document.querySelector('.popup__text_data_subtitle');

export const inputPhotoName = formAddPhotoPopup.querySelector('.popup__text_data_title');
export const inputPhotoLink = formAddPhotoPopup.querySelector('.popup__text_data_subtitle');
