import {Card, UserCard} from './Card.js';
import {initialCards} from './Cards.js';
import {FormValidator} from './FormValidator.js';

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
const addInputWindow = { //тут объект инпутов popup'а add для универсализации с объектом заготовленных карточек в Cards.js
  name: document.querySelector('[name=input-name-add]'),
  link: document.querySelector('[name=input-about-add]')
}
const galleryElements = document.querySelector('.elements');
const popupElements = document.querySelectorAll('.popup');
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//теперь пишем функции
//открываем окошки
function openPopup(popup) {
  popup.classList.add('popup_active'); 
}

//закрываем окошки
function closePopup(popup) {
  popup.classList.remove('popup_active'); 
}

//делаем функцию с несколькими способами закрытия попапа
function closePopupVia(evt) {  
  if ((evt.key === 'Escape')||(evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__cancel-button'))) {
    popupElements.forEach((popupElement) => {
      if (popupElement.classList.contains('popup_active')) {
        closePopup(popupElement);
      }
    });
  }
}

//сделали прогон карточек из Cards.js и создали их при помощи класса Card
initialCards.forEach((item) => {
  const card = new Card(item, '#gallery');
  const cardElement = card.generateCard();
  galleryElements.prepend(cardElement);
})

//создаем пользовательскую карточку при помощи класса UserCard
const createCardFormSubmit = (evt) => { 
  evt.preventDefault();
  const card = new UserCard(addInputWindow, '#gallery');
  const cardElement = card.generateCard();
  galleryElements.prepend(cardElement);
  closePopup(popupAdd);
}

//кнопка save с заменой полей из popup в profile
const getValueOfInputFormsEdit = (evt) => { 
  evt.preventDefault();
  profileInfoName.textContent = inputNameEdit.value;
  profileInfoAbout.textContent = inputAboutEdit.value;
  closePopup(popupEdit);
}

//что происходит при нажатии на кнопку Edit
const openPopupOnEditButton = () => {
  inputNameEdit.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAboutEdit.value = profileInfoAbout.textContent;
  openPopup(popupEdit);
  const validateEditWindow = new FormValidator (validationObject,'#popupEdit');
  validateEditWindow.enableValidation();
}

//что происходит при нажатии на кнопку Add
const openPopupOnAddButton = () => {
  addInputWindow.name.value = '';
  addInputWindow.link.value = '';
  openPopup(popupAdd);
  const validateAddWindow = new FormValidator (validationObject,'#popupAdd');
  validateAddWindow.enableValidation();
}

//слушатели
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add
popupEditForm.addEventListener('submit',getValueOfInputFormsEdit,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
popupAddForm.addEventListener('submit',createCardFormSubmit,false);
document.addEventListener('keydown',closePopupVia); //закрытие popup'ов
document.addEventListener('click',closePopupVia);