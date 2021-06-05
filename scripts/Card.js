export class Card {
    constructor(data, cardSelector, showViewPhotoPopup) {
        this._text = data.name;
        this._imageSrc = data.link;
        this._cardSelector = cardSelector;
        this._showViewPhotoPopup = showViewPhotoPopup;
    }

    getCard() {
        this._element = this._getCardTemplate();

        this._setEventListeners();
        this._initImage();
        this._initTitle();

        return this._element;
    }

    _getCardTemplate() {
        return document.querySelector(this._cardSelector).content
        .querySelector('.place').cloneNode(true);
    }

    _initImage() {
        const image = this._element.querySelector('.place__image');

        image.setAttribute('src', this._imageSrc);
        image.setAttribute('alt', 'Фотография ' + this._text);
    }

    _initTitle() {
        const title = this._element.querySelector('.place__title');

        title.textContent = this._text;
    }

    _handleLikeIcon = () => {
        this._element.querySelector('.place__button-like').classList.toggle('place__button-like_active');
    }

    _handleDeleteIcon = () => {
        this._element.querySelector('.place__button-delete').parentElement.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._showViewPhotoPopup(this._text, this._imageSrc);
        });

        this._element.querySelector('.place__button-like').addEventListener('click', this._handleLikeIcon);
        this._element.querySelector('.place__button-delete').addEventListener('click', this._handleDeleteIcon);
    }
}
