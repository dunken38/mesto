import {Card} from './Card.js';
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
const inputNameAdd = document.querySelector('[name=input-name-add]');
const inputAboutAdd = document.querySelector('[name=input-about-add]');


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
export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown',closePopupVia); //закрытие popup'ов
  document.addEventListener('click',closePopupVia);
}

//закрываем окошки
function closePopup(popup) {
  popup.classList.remove('popup_active'); 
  document.removeEventListener('keydown',closePopupVia); //чистим закрытие popup'ов
  document.removeEventListener('click',closePopupVia);
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

//тут функция где создаем класс userCard для последующего использования в любых карточках
const createCard = (card) => {
  const userCard = new Card(card, '#gallery');
  const cardElement = userCard.generateCard();
  galleryElements.prepend(cardElement);
}

//сделали прогон карточек из Cards.js и создали их при помощи класса Card
initialCards.forEach((item) => {
  createCard(item);
})

//создаем пользовательскую карточку
const createCardFormSubmit = (evt) => { 
  evt.preventDefault();
  const addInputWindow =
  { //объект инпутов popup'а add внутри функции чтобы забирать актуальные значения полей inputNameAdd и inputAboutAdd,иначе undefined
    name: inputNameAdd.value,
    link: inputAboutAdd.value
  };
  createCard(addInputWindow);
  closePopup(popupAdd);
  const validateAddWindow = new FormValidator (validationObject,'#popupAdd'); //тут выключаем кнопку Создать чтобы блокировать создание Enter'ом. Выносить эту строку в отдельную ф-цию не стал,больше строк будет чем сейчас
  validateAddWindow.disabledAddButton();
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
  popupAddForm.reset();
  openPopup(popupAdd);
  const validateAddWindow = new FormValidator (validationObject,'#popupAdd');
  validateAddWindow.enableValidation();
}

//слушатели
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add
popupEditForm.addEventListener('submit',getValueOfInputFormsEdit,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
popupAddForm.addEventListener('submit',createCardFormSubmit,false);