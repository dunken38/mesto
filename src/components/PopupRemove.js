import { Popup } from "./Popup.js";
export class PopupRemove extends Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  removeCardSubmit(removeCard) {
    this._removeCard = removeCard;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('click', () => {
      this._removeCard();
    });
  }
}