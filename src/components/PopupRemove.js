import { Popup } from "./Popup.js";
export class PopupRemove extends Popup {
  constructor(popup) {
    super(popup);
    this._popupSave = this._popup.querySelector('.popup__save-button'); //можно было вынести отсюда и из PopupWithForm в Popup чтобы не плодить,но тогда это было бы не так гибко
  }
  setPopupSubmit(submit) {
    this._handleSubmitCallback = submit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSave.addEventListener('click', () => {
      this._handleSubmitCallback();
    });
  }
}