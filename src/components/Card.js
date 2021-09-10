export class Card {
    constructor(data, cardSelector, callbacks) {
        this._text = data.name;
        this._imageSrc = data.link;
        this._cardSelector = cardSelector;
        this._onClick = callbacks.viewImage;
        this._onDelete = callbacks.confirmDelete;
        this._onLike = callbacks.likeHandler;
        this._likes = data.likes;
        this._isLiked = false;
        this._isOwner = false;
        this._currentUser = null;
        this._ownerId = data.owner._id;
    }

    _handleOnClick = () => {
        const data = {
            name: this._text,
            link: this._imageSrc,
            alt: this._text,
        }

        this._onClick(data);
    }

    _handleLikeCard = () => {
        this._onLike();
        this._likeButton.classList.toggle('place__button-like_active');
        this._isLiked = !this._isLiked;
    }

    _handleRemoveCard = () => {
        this._onDelete();
    }

    _checkIsLiked() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._currentUser) {
                this._isLiked = true;
                break;
            }
        }
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    getCard() {
        this._element = this._getCardTemplate();

        this._initImage();
        this._initTitle();

        this._likeButton = this._element.querySelector('.place__button-like');
        this._likeCounter = this._element.querySelector('.place__quantity-of-likes');
        this.setLikes(this._likes);
        this._checkIsLiked();

        if (this._isLiked) {
            this._likeButton.classList.add('place__button-like_active');
        }

        this._setEventListeners();

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

    setCurrentUser(id) {
        this._currentUser = id;
        if (id === this._ownerId) this._isOwner = true;
    }

    get liked() {
        return this._isLiked;
    }

    setLikes(likes) {
        this._likeCounter.textContent = likes.length;
    }

    _setEventListeners() {
        const removeButton = this._element.querySelector('.place__button-delete');

        if (this._isOwner) {
            removeButton.addEventListener('click', this._handleRemoveCard);
        } else {
            removeButton.remove();
        }

        this._element.querySelector('.place__image').addEventListener('click', this._handleOnClick);
        this._element.querySelector('.place__button-like').addEventListener('click', this._handleLikeCard);
    }
}
