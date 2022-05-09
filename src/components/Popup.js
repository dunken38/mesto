export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  //открытие попапа
  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown',this._handleEscClose); 
  }
  //закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown',this._handleEscClose);
  }
  //закрытие по Esc
  _handleEscClose = (evt) => {
    console.log('1');
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