import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    open(data) {
        const image = this._popup.querySelector('.popup__image');
        this._popup.querySelector('.popup__title').textContent = data.name;
        image.src = data.link;
        image.alt = data.alt;

        super.open();
      }
}