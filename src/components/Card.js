//создаем общий класс для создания карточек
export class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like');
    this._galleryTrashButton = this._element.querySelector('.element__trash');
    this._galleryImage = this._element.querySelector('.element__image');
    this._popupZoomImage = document.querySelector('.popup_type_image');
    this._handleCardClick = handleCardClick;
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
    return this._element;
  }
  //удаление карточки,используется в слушателе корзины
  _removeCard() {
    this._element.remove();
    this._element = null; //+
  }
  //лайк
  _activateLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }
  //слушатели
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._activateLike();
    }); 

    this._galleryTrashButton.addEventListener('click', () => {
      this._removeCard();
    }); 

    this._galleryImage.addEventListener('click', () => {
      this._handleCardClick(this._name,this._link); 
    });
  }
}