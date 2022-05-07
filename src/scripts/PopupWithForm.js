import { Popup } from "./Popup.js";
import { validationObject } from './index.js'

//Класс для создания попапа добавления карточек и редактирования данных о пользователе
export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formList = document.querySelector(validationObject.formSelector);
    this._inputList = document.querySelectorAll(validationObject.inputSelector);
  }
  //собирает данные полей формы
  _getInputValues() {
    this._formObject = {};
    this._inputList.forEach((input) => {
      this._formObject[input.name] = input.value;
    });
    console.log(this._formObject);
    return this._formObject;
  }
  close() {
    super.close();
    this._formList.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._formList.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}