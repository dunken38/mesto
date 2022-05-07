import {Card} from './Card.js';
import {initialCards} from './Cards.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'
import {UserInfo} from './UserInfo.js'

//объявляем переменные
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popupEdit');
const popupAdd = document.querySelector('#popupAdd');
const popupEditForm = document.querySelector('[name=popup-edit-form]');
const popupAddForm = document.querySelector('[name=popup-add-form]');
const inputNameEdit = document.querySelector('[name=input-name-edit]'); 
const inputAboutEdit = document.querySelector('[name=input-about-edit]');
const inputNameAdd = document.querySelector('[name=input-name-add]');
const inputAboutAdd = document.querySelector('[name=input-about-add]');
const popupElements = document.querySelectorAll('.popup');
export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//тут пишем функции,достаем классы

//тут функция где создаем класс userCard для последующего использования в любых карточках и все что связано с карточками
const createCard = (card) => {
  const userCard = new Card(card, '#gallery', {
    handleCardClick: () => {
      openImage.open(card.name,card.link);
    }
  });
  const cardElement = userCard.generateCard();
  return cardElement; //вернул CardElement чтобы можно было вынести отдельно ф-цию добавления карточек и затем использовать в ней текущую ф-цию
}
const createSection = new Section({renderer: (item) => { //создаем экземпляр класса Section
    createSection.addItem(createCard(item));
    }
  } ,'.elements');
createSection.renderItems(initialCards); //прогон-создание массива карточек из Cards.js
const openImage = new PopupWithImage('#popupZoomImage','.popup__image','.popup__image-text'); //тут экземпляр класса для зума карточки (попап карточки)


//тут экземпляр класса для попапа профиля и все что с ним связано
const openEditWindow = new PopupWithForm('#popupEdit', {submitForm: () => {
  openEditWindow.close();
}});
const openPopupOnEditButton = () => { //что происходит при нажатии на кнопку Edit
  inputNameEdit.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAboutEdit.value = profileInfoAbout.textContent;
  openEditWindow.open();
  validateEditWindow.resetErrors();
}
const validateEditWindow = new FormValidator (validationObject,'#popupEdit'); //вынесена валидация полей Edit в корень чтобы класс создавался один раз, для блокироваки кнопки используется disabledAddButton
validateEditWindow.enableValidation();


//тут экземпляр класса для попапа добавления карточки и далее все что связано с ней
const openAddWindow = new PopupWithForm('#popupAdd', {submitForm: () => {
  openAddWindow.close();
}});
const openPopupOnAddButton = () => { //что происходит при нажатии на кнопку Add
  openAddWindow.open();
  validateAddWindow.resetErrors();
}
const validateAddWindow = new FormValidator (validationObject,'#popupAdd'); //вынесена валидация полей Add в корень чтобы класс создавался один раз
validateAddWindow.enableValidation();


//слушатели кнопок Edit и Add
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add