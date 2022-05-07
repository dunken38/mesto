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
//const galleryElements = document.querySelector('.elements');
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
//тут экземпляр класса для зума карточки (попап карточки)
const openImage = new PopupWithImage('#popupZoomImage','.popup__image','.popup__image-text');

//тут функция где создаем класс userCard для последующего использования в любых карточках
const createCard = (card) => {
  const userCard = new Card(card, '#gallery', {
    handleCardClick: () => {
      openImage.open(card.name,card.link);
    }
  });
  const cardElement = userCard.generateCard();
  return cardElement; //вернул CardElement чтобы можно было вынести отдельно ф-цию добавления карточек и затем использовать в ней текущую ф-цию
}
//создаем экземпляр класса Section
const createSection = new Section({renderer: (item) => {
    createSection.addItem(createCard(item));
    }
  } ,'.elements');

//прогон-создание массива карточек из Cards.js
createSection.renderItems(initialCards);

//вынесена валидация полей Edit в корень чтобы класс создавался один раз
//для блокироваки кнопки используется disabledAddButton
const validateEditWindow = new FormValidator (validationObject,'#popupEdit');
validateEditWindow.enableValidation();

//что происходит при нажатии на кнопку Edit
const openPopupOnEditButton = () => {
  inputNameEdit.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAboutEdit.value = profileInfoAbout.textContent;
  //openPopup(popupEdit);
  validateEditWindow.resetErrors();
}

//вынесена валидация полей Add в корень чтобы класс создавался один раз
const validateAddWindow = new FormValidator (validationObject,'#popupAdd');
validateAddWindow.enableValidation();

//что происходит при нажатии на кнопку Add
const openPopupOnAddButton = () => {
  //popupAddForm.reset();
  //openPopup(popupAdd);
  validateAddWindow.resetErrors();
}

//слушатели
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add