import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupCardImage = this._popup.querySelector('.popup__image');
    this._captionImage  = this._popup.querySelector('.popup__title');
  }

    open(data) {
        this._captionImage.textContent = data.name;
        this._popupCardImage.src = data.link;
        this._popupCardImage.alt = data.alt;

        super.open();
      }
}