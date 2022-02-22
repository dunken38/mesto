//объявляем переменные
  //сначала блок для popup
const popupTemplate = document.querySelector('#popupTemplate').content.cloneNode(true); //забираем template для двух окошек edit и add
const popup = popupTemplate.querySelector('.popup');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditForm = popup.querySelector('[name=popup-edit-form]'); //отбор всех form сделал по именам чтобы удалить лишние классы
const cancelButton = popup.querySelector('.popup__cancel-button');
const popupTitle = popup.querySelector('.popup__title');

const popupImage = popup.querySelector('.popup__image');
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const inputName = popupEditForm.querySelector('[name=input-name]'); 
const inputAbout = popupEditForm.querySelector('[name=input-about]');
const saveButton = popup.querySelector('.popup__save-button'); 
const popupWindow = document.querySelector('.popup-window');
popupWindow.append(popupTemplate); //добавляем то что получилось в popup в зависимости от нажатой кнопки (edit or add)
  //теперь блок для gallery (карточек)
const galleryElements = document.querySelector('.elements');
const emptyCards = document.querySelector('.element__empty-cards'); //чтобы убирать надпись "Добавьте карточку"
const galleryTemplate = document.querySelector('#gallery').content; //забираем template для карточек
const galleryImage = galleryTemplate.querySelector('.element__image');
const galleryText = galleryTemplate.querySelector('.element__text');
const popupContentDocument = document.querySelector('.popup__content');



//объект с элементами карточек
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
//закрываем окошко popup
const popupClose = () => {
  popup.classList.remove('popup_active');
}
//кнопка save с заменой полей из popup в profile
const getValueOfInput = (evt) => { 
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  popupClose(); //тут закрываем форму без отправки на сервер
}

//что происходит при нажатии на картинку


//вставляем карточку
const addElement = (name,link) =>{ 
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
  const popupContent = document.querySelector('.popup__content');
  for (i = 0; i < imageFromGallery.length; i++) {
    imageFromGallery[i].addEventListener('click', (event) => {
      console.log(event.target); 
      popupEditForm.removeEventListener('submit',getValueOfInput,false); //удаляем слушатель из popupOpenOnEditButton
      popupEditForm.removeEventListener('submit', addElementAndPreventDefault, false);
      saveButton.remove();
      popupEditForm.remove();
      popupImage.src = event.target.src;
      popup.classList.add('popup_active'); 
    });
  }
  popupClose();
}

for (let i = 0; i < initialCards.length; i++){ //тут карточки из готового массива выше
  addElement(initialCards[i].name,initialCards[i].link);
}

//что происходит при нажатии на кнопку Edit
const popupOpenOnEditButton = () => {
  document.removeEventListener('submit', addElementAndPreventDefault, false);
  //document.removeEventListener('click',bigImage);
  popupTitle.textContent = "Редактировать профиль";
  saveButton.textContent = "Сохранить";
  inputName.placeholder = "Введите ваше имя";
  inputAbout.placeholder = "Напишите Ваши увлечения";
  inputName.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAbout.value = profileInfoAbout.textContent;
  popup.classList.add('popup_active');
  popupEditForm.addEventListener('submit',getValueOfInput,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
}

const addElementAndPreventDefault = (evt) => { //тут вынесли функцию со слушателя submit в окошке add чтобы корректно пользоваться добавлением и отменой слушателя
  evt.preventDefault();
  addElement(inputName.value,inputAbout.value);
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
  popupEditForm.addEventListener('submit', addElementAndPreventDefault, false);
}



//слушатели кнопок
editButton.addEventListener('click',popupOpenOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',popupOpenOnAddButton); //открываем окошко popup по клику на add
cancelButton.addEventListener('click',popupClose); //закрываем окошко popup по клику на крестик





