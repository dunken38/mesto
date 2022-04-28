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

const addInputWindow = {
  name: document.querySelector('[name=input-name-add]'),
  link: document.querySelector('[name=input-about-add]')
}

/*const inputNameAdd = document.querySelector('[name=input-name-add]'); 
const inputAboutAdd = document.querySelector('[name=input-about-add]');*/

const galleryElements = document.querySelector('.elements');
const emptyCards = document.querySelector('.elements__empty'); //чтобы убирать надпись "Добавьте карточку"
const popupZoomImage = document.querySelector('#popupZoomImage');
const imagePopupContent = document.querySelector('.popup__image-content');
const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');
const popupContent = document.querySelector('.popup__content');
const popupElements = document.querySelectorAll('.popup');

//теперь пишем функции
//открываем окошки+сразу пишем условия для закрытия всеми способами
function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown',closePopupVia);
  document.addEventListener('click',closePopupVia);
}

//закрываем окошки
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown',closePopupVia);
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

//вставляем карточку
/*const createCard = (name,link) => { 
  const galleryTemplate = document.querySelector('#gallery').content; //забираем template для карточек
  const galleryElement = galleryTemplate.querySelector('.element').cloneNode(true);
  const galleryImage = galleryElement.querySelector('.element__image');
  const galleryText = galleryElement.querySelector('.element__text');
  const buttonLike = galleryElement.querySelector('.element__like'); //для функционала по лайкам
  const galleryTrashButton = galleryElement.querySelector('.element__trash'); //для функционала по корзине 
  galleryText.textContent = name;
  galleryImage.src = link;
  galleryImage.alt = name;
  buttonLike.addEventListener('click', activateLike); //лайки со слушателем
  galleryTrashButton.addEventListener('click', () => activateTrash(galleryElement)); 
  galleryImage.addEventListener('click', () => zoomGalleryImage(name,link)); //открытие картинки по нажатию
  return galleryElement;
}*/


/*const zoomGalleryImage = (name,link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupZoomImage);
}*/


//сделали прогон карточек из Cards.js и создали их
initialCards.forEach((item) => {
  const card = new Card(item, '#gallery');
  const cardElement = card.generateCard();
  galleryElements.prepend(cardElement);
})

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
}

//тут вынесли функцию со слушателя submit в окошке add чтобы корректно пользоваться добавлением и отменой слушателя
const createCardFormSubmit = (evt) => { 
  evt.preventDefault();
  //pasteCard(addInputWindow.name.value, addInputWindow.link.value);

  const card = new UserCard(addInputWindow, '#gallery');
  const cardElement = card.generateCard();
  galleryElements.prepend(cardElement);
//  console.log(addInputWindow);
  
  closePopup(popupAdd);
}

closePopup(cardElement);

//что происходит при нажатии на кнопку Add
const openPopupOnAddButton = () => {
  addInputWindow.name.value = '';
  addInputWindow.link.value = '';
  openPopup(popupAdd);
}

//слушатели
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add
popupEditForm.addEventListener('submit',getValueOfInputFormsEdit,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
popupAddForm.addEventListener('submit',createCardFormSubmit,false);