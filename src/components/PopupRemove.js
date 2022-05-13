import { Popup } from "./Popup.js";
export class PopupRemove extends Popup {
  setPopupSubmit(submit) {
    this._handleSubmitCallback = submit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__save-button').addEventListener('click', () => {
      this._handleSubmitCallback();
    });
  }
}