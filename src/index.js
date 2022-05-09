import {Card} from './components/Card.js';
import {initialCards} from './components/Cards.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {PopupWithImage} from './components/PopupWithImage.js'
import {PopupWithForm} from './components/PopupWithForm.js'
import {UserInfo} from './components/UserInfo.js'
import './pages/index.css';

//объявляем переменные
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const inputNameEdit = document.querySelector('[name=inputNameEdit]'); 
const inputAboutEdit = document.querySelector('[name=inputAboutEdit]');
export const validationObject = {
  formSelectorEdit: '[name=popup-edit-form]',
  formSelectorAdd: '[name=popup-add-form]',
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
openImage.setEventListeners();


//тут достаем UserInfo для подготовки к замене данных
const userInfo = new UserInfo ({
  profileInfoName: profileInfoName,
  profileInfoAbout: profileInfoAbout
});


//тут экземпляр класса для попапа профиля и все что с ним связано
const openEditWindow = new PopupWithForm('#popupEdit', validationObject.formSelectorEdit, {submitForm: (item) => {
  openEditWindow.close();
  userInfo.setUserInfo(item);
}});
openEditWindow.setEventListeners();
const openPopupOnEditButton = () => { //что происходит при нажатии на кнопку Edit
  const profileUserInfo = userInfo.getUserInfo();
  inputNameEdit.value = profileUserInfo.name; //получаем данные в форму из информации со страницы
  inputAboutEdit.value = profileUserInfo.about;
  openEditWindow.open();
  validateEditWindow.resetErrors();
}
const validateEditWindow = new FormValidator (validationObject,'#popupEdit'); //вынесена валидация полей Edit в корень чтобы класс создавался один раз, для блокироваки кнопки используется disabledAddButton
validateEditWindow.enableValidation();


//тут экземпляр класса для попапа добавления карточки и далее все что связано с ней
const openAddWindow = new PopupWithForm('#popupAdd', validationObject.formSelectorAdd, {submitForm: (item) => {
   //тут воткнул ф-цию добавления карточек
  const addCardObject =
  { //объект инпутов popup'а add внутри функции чтобы забирать актуальные значения полей inputNameAdd и inputAboutAdd,иначе undefined
    name: item.inputNameAdd,
    link: item.inputAboutAdd
  };
  createSection.addItem(createCard(addCardObject));
  openAddWindow.close();
}});
openAddWindow.setEventListeners();
const openPopupOnAddButton = () => { //что происходит при нажатии на кнопку Add
  openAddWindow.open();
  validateAddWindow.resetErrors();
}
const validateAddWindow = new FormValidator (validationObject,'#popupAdd'); //вынесена валидация полей Add в корень чтобы класс создавался один раз
validateAddWindow.enableValidation();


//слушатели кнопок Edit и Add
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add