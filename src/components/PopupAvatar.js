import { Popup } from "./Popup.js";
import { validationObject } from '../pages/index.js'

//Класс для создания попапа добавления карточек и редактирования данных о пользователе
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = document.querySelector(formSelector);
    this._inputList = document.querySelectorAll(validationObject.inputSelector);
  }
  //собирает данные полей формы
  _getInputValues() {
    this._formObject = {};
    this._inputList.forEach((input) => {
      this._formObject[input.name] = input.value;
    });
    return this._formObject;
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}