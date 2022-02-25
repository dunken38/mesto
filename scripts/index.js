//объявляем переменные
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const cancelButtonEdit = document.querySelector('#cancelButtonEdit'); //сделал поиск переменных в некоторых случаях по id и name чтобы оставить одинаковые классы в разных местах
const cancelButtonAdd = document.querySelector('#cancelButtonAdd');
const cancelButtonZoomImage = document.querySelector('#cancelButtonZoomImage');
const popupEdit = document.querySelector('#popupEdit');
const popupAdd = document.querySelector('#popupAdd');
const popupEditForm = document.querySelector('[name=popup-edit-form]');
const popupAddForm = document.querySelector('[name=popup-add-form]');
const inputNameEdit = document.querySelector('[name=input-name-edit]'); 
const inputAboutEdit = document.querySelector('[name=input-about-edit]');
const inputNameAdd = document.querySelector('[name=input-name-add]'); 
const inputAboutAdd = document.querySelector('[name=input-about-add]');
const galleryElements = document.querySelector('.elements');
const emptyCards = document.querySelector('.elements__empty'); //чтобы убирать надпись "Добавьте карточку"
const popupWindow = document.querySelector('.popup-window');
const popupZoomImage = document.querySelector('#popupZoomImage');
const imagePopupContent = document.querySelector('.popup__image-content');
const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');

//теперь пишем функции
//открываем окошки
function openPopup(popup){
  popup.classList.add('popup_active');
}
//закрываем окошки
function closePopup(popup){
  popup.classList.remove('popup_active');
}

//вставляем карточку
const createCard = (name,link) => { 
  const galleryTemplate = document.querySelector('#gallery').content; //забираем template для карточек
  const galleryElement = galleryTemplate.querySelector('.element').cloneNode(true);
  const galleryImage = galleryElement.querySelector('.element__image');
  const galleryText = galleryElement.querySelector('.element__text');
  const buttonLike = galleryElement.querySelector('.element__like'); //для функционала по лайкам
  const galleryTrashButton = galleryElement.querySelector('.element__trash'); //для функционала по корзине 
  galleryText.textContent = name;
  galleryImage.src = link;
  galleryImage.alt = name;
  buttonLike.addEventListener('click', function(event){ //лайки со слушателем
    event.target.classList.toggle('element__like_active');
  });
  galleryTrashButton.addEventListener('click',function(){ 
    galleryElement.remove(); 
  });
  //const zoomGalleryFunc = zoomGalleryImage.bind(name,link);
  //открытие картинки по нажатию   
  galleryImage.addEventListener('click',zoomGalleryImage.bind(null,name,link));
  return galleryElement;
}

const zoomGalleryImage = (name,link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupZoomImage);
}

const pasteCard = (name,link) => {
  galleryElements.prepend(createCard(name,link));
}

//тут 6 карточек из готового массива выше
for (let i = 0; i < initialCards.length; i++){ 
  pasteCard(initialCards[i].name,initialCards[i].link);
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
}

//тут вынесли функцию со слушателя submit в окошке add чтобы корректно пользоваться добавлением и отменой слушателя
const createCardFormSubmit = (evt) => { 
  evt.preventDefault();
  pasteCard(inputNameAdd.value,inputAboutAdd.value);
  closePopup(popupAdd);
}

//что происходит при нажатии на кнопку Add
const openPopupOnAddButton = () => {
  inputNameAdd.value = '';
  inputAboutAdd.value = '';
  openPopup(popupAdd);
}

//слушатели кнопок
editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add
popupEditForm.addEventListener('submit',getValueOfInputFormsEdit,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
popupAddForm.addEventListener('submit',createCardFormSubmit,false);
cancelButtonZoomImage.addEventListener('click',closePopup.bind(null,popupZoomImage));
cancelButtonEdit.addEventListener('click',closePopup.bind(null,popupEdit));
cancelButtonAdd.addEventListener('click',closePopup.bind(null,popupAdd));