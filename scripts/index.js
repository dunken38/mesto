//объявляем переменные
const popupTemplate = document.querySelector('#popupTemplate').content; //забираем template для двух окошек edit и add
const popup = popupTemplate.querySelector('.popup').cloneNode(true);
const galleryElements = document.querySelector('.elements');
const emptyCards = document.querySelector('.element__empty-cards'); //чтобы убирать надпись "Добавьте карточку"
const galleryTemplate = document.querySelector('#gallery').content; //забираем template для карточек
const popupWindow = document.querySelector('.popup-window');
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditForm = popup.querySelector('[name=popup-edit-form]'); //отбор всех form сделал по именам чтобы удалить лишние классы
const cancelButton = popup.querySelector('.popup__cancel-button');
const popupTitle = popup.querySelector('.popup__title');
const popupContentDocument = popup.querySelector('.popup__content');
const saveButton = popup.querySelector('.popup__save-button'); 
const popupContent = popup.querySelector('.popup__content');
const inputName = popupEditForm.querySelector('[name=input-name]'); 
const inputAbout = popupEditForm.querySelector('[name=input-about]');
const galleryImage = galleryTemplate.querySelector('.element__image');
const galleryText = galleryTemplate.querySelector('.element__text');
const imageTemplate = document.querySelector('#imageTemplate').content; //забираем из template для большой картинки при клике
const imagePopup = imageTemplate.querySelector('.popup').cloneNode(true);
const imagePopupContent = imagePopup.querySelector('.popup__image-content');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageText = imagePopup.querySelector('.popup__image-text');
const imageCancelButton = imagePopup.querySelector('.popup__cancel-button');
popupWindow.append(popup); //добавляем то что получилось в popup в зависимости от нажатой кнопки (edit or add)
popupWindow.append(imagePopup); //добавляем при увеличении картинки

//массив с элементами карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//теперь пишем функции
//закрываем окошко popup и imagePopup
const popupClose = () => {
  popup.classList.remove('popup_active');
}
const imagePopupClose = () => {
  imagePopup.classList.remove('popup_active');
}

//кнопка save с заменой полей из popup в profile
const getValueOfInput = (evt) => { 
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  popupClose(); //тут закрываем форму без отправки на сервер
}

//вставляем карточку
const addElement = (name,link) => { 
  galleryText.textContent = name;
  galleryImage.src = link;
  const galleryElement = galleryTemplate.querySelector('.element').cloneNode(true);
  galleryElements.prepend(galleryElement);
  const likeState = galleryElement.querySelector('.element__like'); //для функционала по лайкам
  likeState.addEventListener('click', function(event){ //лайки со слушателем
    event.target.classList.toggle('element__like_active');
  });
  const element = document.querySelectorAll('.element');
  const galleryTrashButton = document.querySelectorAll('.element__trash'); //для функционала по корзине
    for (let i = 0; i < element.length; i++) {    
      galleryTrashButton[i].addEventListener('click',function(){
        element[i].remove();
        if (galleryElements.children.length == 0) { //тут проверяем не удалены ли все карточки чтобы показать надпись emptyCards
          galleryElements.append(emptyCards);
        }
      });
    }
  if (emptyCards) { //тут проверяем если emptyCards присутствует,то удаляем его при добавлении карточки
    emptyCards.remove();
  }
  //открытие картинки по нажатию
  const imageFromGallery = document.querySelectorAll('.element__image');  
  const bigImage = (event) => {
    popupEditForm.removeEventListener('submit',getValueOfInput,false); //удаляем слушатель из popupOpenOnEditButton
    popupEditForm.removeEventListener('submit', addElementAndPreventDefault, false);
    imagePopupContent.style.backgroundColor = 'transparent';
    popupImage.src = event.target.src;
    popupImageText.textContent = event.target.nextElementSibling.firstElementChild.textContent;
    imagePopup.classList.add('popup_active'); 
    
  }
  for (i = 0; i < imageFromGallery.length; i++) {
    imageFromGallery[i].addEventListener('click',bigImage); 
  }
}

//тут 6 карточек из готового массива выше
for (let i = 0; i < initialCards.length; i++){ 
  addElement(initialCards[i].name,initialCards[i].link);
}

//что происходит при нажатии на кнопку Edit
const popupOpenOnEditButton = () => {
  popupEditForm.removeEventListener('submit', addElementAndPreventDefault, false);
  popupTitle.textContent = "Редактировать профиль";
  saveButton.textContent = "Сохранить";
  inputName.placeholder = "Введите ваше имя";
  inputAbout.placeholder = "Напишите Ваши увлечения";
  inputName.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAbout.value = profileInfoAbout.textContent;
  popup.classList.add('popup_active');  
  popupEditForm.addEventListener('submit',getValueOfInput,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
}

//тут вынесли функцию со слушателя submit в окошке add чтобы корректно пользоваться добавлением и отменой слушателя
const addElementAndPreventDefault = (evt) => { 
  evt.preventDefault();
  addElement(inputName.value,inputAbout.value);
  popupClose();
}

//что происходит при нажатии на кнопку Add
const popupOpenOnAddButton = () => {
  popupEditForm.removeEventListener('submit',getValueOfInput,false); //удаляем слушатель из popupOpenOnEditButton
  inputName.value = '';
  inputAbout.value = '';
  popupTitle.textContent = "Новое место";
  saveButton.textContent = "Создать";
  inputName.placeholder = "Название";
  inputAbout.placeholder = "Ссылка на картинку";
  popup.classList.add('popup_active');
  popupEditForm.addEventListener('submit',addElementAndPreventDefault,false);
}

//слушатели кнопок
editButton.addEventListener('click',popupOpenOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',popupOpenOnAddButton); //открываем окошко popup по клику на add
cancelButton.addEventListener('click',popupClose); //закрываем окошко popup по клику на крестик
imageCancelButton.addEventListener('click',imagePopupClose); //закрываем большую картинку