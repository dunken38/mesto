//создаем общий класс для создания карточек
export class Card {
  constructor(data, currentUserId, cardSelector, {handleCardClick, handleDelete, handleLike}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._likesArr = data.likes;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like');
    this._likeCounter =  this._element.querySelector('element__like-counter');
    this._galleryTrashButton = this._element.querySelector('.element__trash');
    this._galleryImage = this._element.querySelector('.element__image');
    this._popupZoomImage = document.querySelector('.popup_type_image');
    this._handleCardClick = handleCardClick;
    this._hadleDelete = handleDelete;
    this._handleLike = handleLike;
  }
  //достаем шаблон карточки
  _getTemplate() {
    const galleryElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return galleryElement;
  }
  //создаем карточку посредством присвоения полям шаблона новых значений
  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    if(this._userId !== this._currentUserId) {
      this._galleryTrashButton.style.display = 'none';
    };
    this.activateLike(this._likesArr);
    return this._element;
  }
  //удаление карточки,используется в слушателе корзины
  removeCard() {
    this._element.remove();
    this._element = null; //+
  }
  //ID карточки
  getId() {
    return this._cardId;
  }
  //лайк
  _activateLikeIcon() {
    this._buttonLike.classList.toggle('element__like_active');
  }
  activateLike(likesArray) {
    this._likes = likesArray;
    this._likeCounter.textContent = this._likes.length;
    for(let i = 0; i < this._likes.length; i++) {
      if(this._likes[i]._id == this._currentUserId) {
        this._buttonLike.classList.add('elements__like_active');
        break; 
      } else {
        this._buttonLike.classList.remove('elements__like_active');
      }
    }
  }
  //проверяем лайк
  checkLike() { 
    return this._buttonLike.classList.contains('elements__like_active')
  }
  //слушатели
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._activateLikeIcon();
      this._handleLike(this.checkLike())
    }); 

    this._galleryTrashButton.addEventListener('click', () => {
      this._hadleDelete(this._cardId);
    }); 

    this._galleryImage.addEventListener('click', () => {
      this._handleCardClick(this._name,this._link); 
    });
  }
}