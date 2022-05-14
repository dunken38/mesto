export class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }
  //открытие попапа
  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown',this._handleEscClose); 
  }
  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown',this._handleEscClose);
  }
  //закрытие по Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }  
  //слушатели
  setEventListeners() {
    this._popup.addEventListener('click',(evt) => {
      if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__cancel-button'))) {
        this.close();
      }
    });
  };
}