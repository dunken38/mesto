import { Popup } from "./Popup.js";

//Класс для создания попапа карточки
export class PopupWithImage extends Popup {
  constructor(popup, popupImage, popupImageText) {
    super(popup);
    this._popupImage = this._popup.querySelector(popupImage);
    this._popupImageText = this._popup.querySelector(popupImageText);
  }
  open(name,link) {
    this._popupImage.src = link; //дальше подменяем поля картинки и имени из полей попапа add
    this._popupImage.alt = name;
    this._popupImageText.textContent = name;
    super.open(); //берем метод из Popup class
  }
}