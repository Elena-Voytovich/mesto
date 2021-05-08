const overlayEditProfile = document.querySelector('.overlay-edit-profile');
const titleEditProfile = document.querySelector(".profile__title");
const subtitleEditProfile = document.querySelector(".profile__subtitle");
const buttonShowEditProfilePopup = document.querySelector(".profile__button-edit-profile");
const popupEditProfile = overlayEditProfile.querySelector('.popup');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector(".popup__button-close");

const formEditProfilePopup = popupEditProfile.querySelector(".popup__form");
const inputUserName = formEditProfilePopup.querySelector('.popup__text_data_title');
const inputUserJob = formEditProfilePopup.querySelector('.popup__text_data_subtitle');

const overlayAddPhoto = document.querySelector('.overlay-add-photo');
const buttonShowAddPhotoPopup = document.querySelector('.profile__button-add-photo');
const popupAddPhoto = overlayAddPhoto.querySelector('.popup');
const buttonCloseAddPhotoPopup = popupAddPhoto.querySelector('.popup__button-close');

const formAddPhotoPopup = popupAddPhoto.querySelector('.popup__form');
const inputPhotoName = formAddPhotoPopup.querySelector('.popup__text_data_title');
const inputPhotoLink = formAddPhotoPopup.querySelector('.popup__text_data_subtitle');

const sectionCards = document.querySelector('.places');

const overlayViewPhoto = document.querySelector('.overlay-view-photo');
const imageViewPhoto = overlayViewPhoto.querySelector('.popup__image');
const titleViewPhoto = overlayViewPhoto.querySelector('.popup__title');
const buttonCloseViewPhotoPopup = overlayViewPhoto.querySelector('.popup__button-close');

const cardTemplate = document.querySelector('#article-template').content;

const cardsInfo = [
    {
        name: 'Thaa, Maldives',
        link: 'https://i.postimg.cc/3rGM4XvM/photo-maldives.jpg'
    },
    {
        name: 'Bali, Indonesia',
        link: 'https://i.postimg.cc/rsx7BTky/photo-indonesia.jpg'
    },
    {
        name: 'Calle Niño de Guevara',
        link: 'https://i.postimg.cc/9FPv1cbJ/photo-spain.jpg'
    },
    {
        name: 'Chongqing, 重庆市中国',
        link: 'https://i.postimg.cc/RZL43c2C/photo-chongqing.jpg'
    },
    {
        name: 'Åndalsnes, Norway',
        link: 'https://i.postimg.cc/mgbK5K6R/photo-norway.jpg'
    },
    {
        name: 'Ponte 25 de Abril, Lisboa, Portugal',
        link: 'https://i.postimg.cc/Nfv31K6K/photo-portugal.jpg'
    }
];

function createCards() {
    cardsInfo.forEach(cardInfo => {
        sectionCards.append(createCardFromTemplate(cardInfo));
    });
}

function createCardFromTemplate(cardInfo) {
    const card = cardTemplate.querySelector('.place').cloneNode(true);

    const image = card.querySelector('.place__image');
    image.setAttribute('src', cardInfo.link);
    image.setAttribute('alt', 'Фотография ' + cardInfo.name);
    image.addEventListener('click', (evt) => {
        showViewPhotoPopup(evt);
    })

    const title = card.querySelector('.place__title');
    title.textContent = cardInfo.name;

    const buttonLike = card.querySelector('.place__button-like');
    buttonLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('place__button-like_active');
    })

    const buttonDelete = card.querySelector('.place__button-delete');
    buttonDelete.addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
    })

    return card;
}

function openPopup(overlay) {
    overlay.classList.add('overlay_visible');
}

function closePopup(overlay) {
    overlay.classList.remove('overlay_visible');
}

function onShowEditProfilePopup() {
    setDefaultUserInfoInputs(titleEditProfile.textContent, subtitleEditProfile.textContent);
    openPopup(overlayEditProfile);
}

function setDefaultUserInfoInputs(name, job) {
    inputUserName.value = name;
    inputUserJob.value = job;
}

function onCloseEditProfilePopup() {
    closePopup(overlayEditProfile);
}

function onShowAddPhotoPopup() {
    openPopup(overlayAddPhoto);
}

function onCloseAddPhotoPopup() {
    closePopup(overlayAddPhoto);
}

function onSubmitFormEditProfilePopup(evt) {
    evt.preventDefault();
    setEditProfileTitles(inputUserName.value, inputUserJob.value);
    closePopup(overlayEditProfile);
}

function onSubmitFormAddPhotoPopup(evt) {
    evt.preventDefault();

    const card = { 
        name: inputPhotoName.value, 
        link: inputPhotoLink.value 
    };
    
    sectionCards.prepend(createCardFromTemplate(card));
    formAddPhotoPopup.reset();
    
    closePopup(overlayAddPhoto);
}

function setEditProfileTitles(name, job) {
    titleEditProfile.textContent = name;
    subtitleEditProfile.textContent = job;
}

function showViewPhotoPopup(evt) {
    imageViewPhoto.setAttribute('src', evt.target.src);
    imageViewPhoto.setAttribute('alt', evt.target.alt);
    titleViewPhoto.textContent = imageViewPhoto.getAttribute('alt').substr(imageViewPhoto.getAttribute('alt').indexOf(' '));
    openPopup(overlayViewPhoto);
}

function onCloseViewPhotoPopup() {
    closePopup(overlayViewPhoto);
}

document.addEventListener("DOMContentLoaded", createCards);

buttonShowEditProfilePopup.addEventListener('click', onShowEditProfilePopup);
buttonCloseEditProfilePopup.addEventListener('click', onCloseEditProfilePopup);

buttonShowAddPhotoPopup.addEventListener('click', onShowAddPhotoPopup);
buttonCloseAddPhotoPopup.addEventListener('click', onCloseAddPhotoPopup);

formAddPhotoPopup.addEventListener('submit', onSubmitFormAddPhotoPopup);
buttonCloseViewPhotoPopup.addEventListener('click', onCloseViewPhotoPopup);

formEditProfilePopup.addEventListener('submit', onSubmitFormEditProfilePopup);
