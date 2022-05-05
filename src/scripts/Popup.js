export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);;
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
  //зум запихнул сюда же
  _zoomGalleryImage() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupImageText.textContent = this._name;
    openPopup(this._popupZoomImage);
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
      this._zoomGalleryImage(); 
    });
  }
}