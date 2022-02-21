//объявляем переменные
  //сначала блок для popup
const popupTemplate = document.querySelector('#popupTemplate').content.cloneNode(true); //забираем template для двух окошек edit и add
const popup = popupTemplate.querySelector('.popup');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditForm = popup.querySelector('[name=popup-edit-form]'); //отбор всех form сделал по именам чтобы удалить лишние классы
const cancelButton = popup.querySelector('.popup__cancel-button');
const popupTitle = popup.querySelector('.popup__title');
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

//вставляем карточку
const addElement = (evt) =>{ 
  evt.preventDefault();
  galleryText.textContent = inputName.value;
  galleryImage.src = inputAbout.value;
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

  //galleryTemplate.cloneNode(true);
  popupClose(); //тут закрываем форму без отправки на сервер
  console.log(element.length);
  console.log(galleryTrashButton.length);
}

//что происходит при нажатии на кнопку Edit
const popupOpenOnEditButton = () => {
  popupTitle.textContent = 'Редактировать профиль';
  saveButton.textContent = 'Сохранить';
  inputName.placeholder = "Введите ваше имя";
  inputAbout.placeholder = "Напишите Ваши увлечения";
  inputName.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAbout.value = profileInfoAbout.textContent;
  popup.classList.add('popup_active');
  popupEditForm.addEventListener('submit',getValueOfInput,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.
}

//что происходит при нажатии на кнопку Add
const popupOpenOnAddButton = () => {
  popupEditForm.removeEventListener('submit',getValueOfInput,false); //удаляем слушатель из popupOpenOnEditButton
  inputName.value = '';
  inputAbout.value = '';
  popupTitle.textContent = 'Новое место';
  saveButton.textContent = 'Создать';
  inputName.placeholder = "Название";
  inputAbout.placeholder = "Ссылка на картинку";
  popup.classList.add('popup_active');
  popupEditForm.addEventListener('submit',addElement,false);
}

//слушатели кнопок
editButton.addEventListener('click',popupOpenOnEditButton); //открываем окошко popup по клику на edit
addButton.addEventListener('click',popupOpenOnAddButton); //открываем окошко popup по клику на add
cancelButton.addEventListener('click',popupClose); //закрываем окошко popup по клику на крестик


