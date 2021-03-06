//>поправил в основном критические замечания чтобы успеть в дедлайн

import * as data from '../utils/constants.js'
import { validationObject } from '../utils/constants.js'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'
import { PopupRemove } from '../components/PopupRemove.js';
import './index.css';

//тут пишем функции,достаем классы

//подаем на вход Api функций данные
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '2c648237-6fa7-446a-a733-c0b86e95b124',
    'Content-Type': 'application/json'
  }
});


//тут функция где создаем класс userCard для последующего использования в любых карточках и все что связано с карточками
const createCard = (card) => {
  const userCard = new Card(card, currentUserId, '.template_type_gallery', {
    handleCardClick: () => {
      openImage.open(card.name,card.link);
    },
    handleLike: (isLiked) => {
      if(isLiked) {
        api.deleteLikes(userCard.getId())
          .then(card => {
            userCard.activateLikeIcon();
            userCard.activateLike(card.likes);
            
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        api.putLikes(userCard.getId())
          .then(card => {
            userCard.activateLikeIcon();
            userCard.activateLike(card.likes);
            
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleDelete: () => {
      deleteCardWindow.setPopupSubmit(() => {
        api.deleteCard(userCard.getId()).then(() => {
          userCard.removeCard();
          deleteCardWindow.close();
        }).catch(err => {
          console.log(err)
        })
      });
      deleteCardWindow.open();
    }
  });
  return userCard.generateCard();
}
const createSection = new Section({renderer: (item) => { //создаем экземпляр класса Section
    createSection.addItem(createCard(item));
    }
  } ,'.elements');
//createSection.renderItems(initialCards); //прогон-создание массива карточек из Cards.js
const openImage = new PopupWithImage('.popup_type_image','.popup__image','.popup__image-text'); //тут экземпляр класса для зума карточки (попап карточки)


//создаем экземпляр попапа для удаления карточки
const deleteCardWindow = new PopupRemove('.popup_type_remove');


//тут достаем UserInfo для подготовки к замене данных
const userInfo = new UserInfo ({
  profileInfoName: data.profileInfoName,
  profileInfoAbout: data.profileInfoAbout,
  profileInfoAvatar: data.profileInfoAvatar
});
let currentUserId;
Promise.all([
  api.getUser(),
  api.getInitialCards()
])
.then(([userInfoArr, cards]) => {
  userInfo.setUserInfo(userInfoArr);
  userInfo.setUserAvatar(userInfoArr);
  currentUserId = userInfoArr._id;
  createSection.renderItems(cards);
})
.catch(err => {
  console.log(`Error: ${err}`);
})


//тут экземпляр класса для попапа профиля и все что с ним связано
const openEditWindow = new PopupWithForm('.popup_type_edit', validationObject.formEdit, {submitForm: (item) => {
  openEditWindow.isLoading(true,'Сохранение...');
  api.patchUser(item)
  .then(result => {
    userInfo.setUserInfo(result);
    openEditWindow.close();
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    openEditWindow.isLoading(false,'Сохранить');
  })
}});
const openPopupOnEditButton = () => { //что происходит при нажатии на кнопку Edit
  const userInfoArr = userInfo.getUserInfo();
  openEditWindow.setInputValues(userInfoArr);
  openEditWindow.open();
  validateEditWindow.resetErrors();
  validateEditWindow.disabledAddButton(); //добавил метод для выключения кнопки сабмит (ниже для всех попапов)
}
const validateEditWindow = new FormValidator (validationObject,'.popup_type_edit'); //вынесена валидация полей Edit в корень чтобы класс создавался один раз, для блокироваки кнопки используется disabledAddButton
validateEditWindow.enableValidation();


//тут экземпляр попапа аватара и все что с ним связано
const openAvatarWindow = new PopupWithForm('.popup_type_avatar', validationObject.formAvatar, {submitForm: (item) => {
  openAvatarWindow.isLoading(true,'Сохранение...');
  api.patchAvatar(item)
  .then(result => {
    userInfo.setUserAvatar(result);
    openAvatarWindow.close();
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    openAvatarWindow.isLoading(false,'Сохранить');
  })
}});
const openPopupAvatar = () => { //что происходит при нажатии на аватарку
  openAvatarWindow.open();
  validateAvatarWindow.resetErrors();
  validateAvatarWindow.disabledAddButton();
}
const validateAvatarWindow = new FormValidator (validationObject,'.popup_type_avatar'); 
validateAvatarWindow.enableValidation();


//тут экземпляр класса для попапа добавления карточки и далее все что связано с ней
const openAddWindow = new PopupWithForm('.popup_type_add', validationObject.formAdd, {submitForm: (item) => {
  openAddWindow.isLoading(true,'Создание...');
  api.postCard(item.name,item.link)
  .then(result => {
    createSection.addItem(createCard(result));
    openAddWindow.close();
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    openAddWindow.isLoading(false,'Создать');
  })
}});
const openPopupOnAddButton = () => { //что происходит при нажатии на кнопку Add
  openAddWindow.open();
  validateAddWindow.resetErrors();
  validateAddWindow.disabledAddButton();
}
const validateAddWindow = new FormValidator (validationObject,'.popup_type_add');
validateAddWindow.enableValidation();


//слушатели
data.editButton.addEventListener('click',openPopupOnEditButton); //открываем окошко popup по клику на edit
data.addButton.addEventListener('click',openPopupOnAddButton); //открываем окошко popup по клику на add
data.avatarButton.addEventListener('click',openPopupAvatar); //открываем окошко popup по клику на avatar
openEditWindow.setEventListeners();
openImage.setEventListeners();
openAddWindow.setEventListeners();
openAvatarWindow.setEventListeners();
deleteCardWindow.setEventListeners();