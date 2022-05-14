import { Popup } from "./Popup.js";
import { validationObject } from '../utils/constants.js'

//Класс для создания попапа добавления карточек и редактирования данных о пользователе
export class PopupWithForm extends Popup {
  constructor(popup, formClass, {submitForm}) {
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(formClass);
    this._inputList = this._form.querySelectorAll(validationObject.input);
    this._popupSave = this._popup.querySelector('.popup__save-button');
  }
  //собирает данные полей формы
  _getInputValues() {
    this._formObject = {};
    this._inputList.forEach((input) => {
      this._formObject[input.name] = input.value;
    });
    return this._formObject;
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
  isLoading(isLoading,buttonText) {
    return this._popupSave.textContent = buttonText;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}