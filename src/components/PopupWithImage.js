import { Popup } from "./Popup.js";

//Класс для создания попапа карточки
export class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageSelector, popupImageTextSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(popupImageSelector);
    this._popupImageText = document.querySelector(popupImageTextSelector);
  }
  open(name,link) {
    this._popupImage.src = link; //дальше подменяем поля картинки и имени из полей попапа add
    this._popupImage.alt = name;
    this._popupImageText.textContent = name;
    super.open(); //берем метод из Popup class
  }
}