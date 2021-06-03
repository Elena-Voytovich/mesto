export class Card {
    constructor(text, imageSrc, cardTemplate, showViewPhotoPopup) {
        this._text = text;
        this._imageSrc = imageSrc;
        this._cardTemplate = cardTemplate;
        this._showViewPhotoPopup = showViewPhotoPopup;
    }

    getCard() {
        const card = this._getCardTemplate();

        this._initImage(card);
        this._initTitle(card);
        this._initButtonLike(card);
        this._initButtonDelete(card);

        return card;
    }

    _getCardTemplate() {
        return this._cardTemplate.querySelector('.place').cloneNode(true);
    }

    _initImage(card) {
        const image = card.querySelector('.place__image');

        image.setAttribute('src', this._imageSrc);
        image.setAttribute('alt', 'Фотография ' + this._text);
        image.addEventListener('click', (evt) => {
            this._showViewPhotoPopup(evt);
        })
    }

    _initTitle(card) {
        const title = card.querySelector('.place__title');

        title.textContent = this._text;
    }

    _initButtonLike(card) {
        const buttonLike = card.querySelector('.place__button-like');

        buttonLike.addEventListener('click', (evt) => {
            evt.target.classList.toggle('place__button-like_active');
        })
    }

    _initButtonDelete(card) {
        const buttonDelete = card.querySelector('.place__button-delete');

        buttonDelete.addEventListener('click', (evt) => {
            evt.target.parentElement.remove();
        })
    }
}
