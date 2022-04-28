export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like');
    this._galleryTrashButton = this._element.querySelector('.element__trash');
    this._popupImage = document.querySelector('.popup__image');
    this._popupImageText = document.querySelector('.popup__image-text');
    this._galleryImage = this._element.querySelector('.element__image');
    this._popupZoomImage = document.querySelector('#popupZoomImage');
  }

  _getTemplate() {
    const galleryElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return galleryElement;
  }

  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    return this._element;
  }

  _removeCard() {
    this._element.remove();
  }

  _activateLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _zoomGalleryImage() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupImageText.textContent = this._name;
    this._popupZoomImage.classList.add('popup_active');
  }

  
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

//наследуем от Card для создания новых карточек из окошка add
export class UserCard extends Card {
  constructor(data,cardSelector) {
    super(data,cardSelector);
    this._name = data.name.value; //тут достаем данные из полей в отличии от Card
    this._link = data.link.value;
  }
}

/*const zoomGalleryImage = (name,link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupZoomImage);
}*/
