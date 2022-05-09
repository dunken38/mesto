export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);;
  }
  //открытие попапа
  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown',(evt) => {
      this._handleEscClose(evt);
    }); 
  }
  //закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown',(evt) => {
      this._handleEscClose(evt);
    }); 
  }
  //закрытие по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }  
  //слушатели
  setEventListeners() {
    document.addEventListener('click',(evt) => {
      if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__cancel-button'))) {
        this.close();
      }
    });
  };
}