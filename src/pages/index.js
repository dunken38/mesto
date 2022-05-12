import {Card} from '../components/Card.js';
import {initialCards} from '../components/Cards.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'
import './index.css';

//объявляем переменные
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const inputNameEdit = document.querySelector('.popup__input_type_name-edit'); 
const inputAboutEdit = document.querySelector('.popup__input_type_about-edit');
export const validationObject = {
  formSelectorEdit: '.popup__form_type_edit',
  formSelectorAdd: '.popup__form_type_add',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


//тут пишем функции,достаем классы

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '2c648237-6fa7-446a-a733-c0b86e95b124',
    'Content-Type': 'application/json'
  }
});


//тут функция где создаем класс userCard для последующего использования в любых карточках и все что связано с карточками
const createCard = (card) => {
  const userCard = new Card(card, '.template_type_gallery', {
    handleCardClick: () => {
      openImage.open(card.name,card.link);
    }
  });
  return userCard.generateCard();
}
const createSection = new Section({renderer: (item) => { //создаем экземпляр класса Section
    createSection.addItem(createCard(item));
    }
  } ,'.elements');
createSection.renderItems(initialCards); //прогон-создание массива карточек из Cards.js
const openImage = new PopupWithImage('.popup_type_image','.popup__image','.popup__image-text'); //тут экземпляр класса для зума карточки (попап карточки)


//тут достаем UserInfo для подготовки к замене данных
const userInfo = new UserInfo ({
  profileInfoName: profileInfoName,
  profileInfoAbout: profileInfoAbout
});


//тут экземпляр класса для попапа профиля и все что с ним связано
const openEditWindow = new PopupWithForm('.popup_type_edit', validationObject.formSelectorEdit, {submitForm: (item) => {
  openEditWindow.close();
  userInfo.setUserInfo(item);
}});
const openPopupOnEditButton = () => { //что происходит при нажатии на кнопку Edit
  const {name, about} = userInfo.getUserInfo();
  inputNameEdit.value = name; //получаем данные в форму из информации со страницы
  inputAboutEdit.value = about;
  openEditWindow.open();
  validateEditWindow.resetErrors();
}
const validateEditWindow = new FormValidator (validationObject,'.popup_type_edit'); //вынесена валидация полей Edit в корень чтобы класс создавался один раз, для блокироваки кнопки используется disabledAddButton
validateEditWindow.enableValidation();


//тут экземпляр класса для попапа добавления карточки и далее все что связано с ней
const openAddWindow = new PopupWithForm('.popup_type_add', validationObject.formSelectorAdd, {submitForm: (item) => {
   //тут воткнул ф-цию добавления карточек
  createSection.addItem(createCard(item));
  openAddWindow.close();
}});
const openPopupOnAddButton = () => { //что происходит при нажатии на кнопку Add
  openAddWindow.open();
  validateAddWindow.resetErrors();
}
const validateAddWindow = new FormValidator (validationObject,'.popup_type_add'); //вынесена валидация полей Add в корень чтобы класс создавался один раз
validateAddWindow.enableValidation();


//слушатели
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add
openEditWindow.setEventListeners();
openImage.setEventListeners();
openAddWindow.setEventListeners();