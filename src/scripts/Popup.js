export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);;
  }
  //открытие попапа
  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown',this._handleEscClose); //закрытие popup'ов
    this._popupSelector.addEventListener('click',this._handleClickClose);
  }
  //закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_active'); 
    document.removeEventListener('keydown',this._handleEscClose); //чистим закрытие popup'ов
    this._popupSelector.removeEventListener('click',this._handleClickClose);
  }

  //закрытие по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  //закрытие кликом  
  _handleClickClose(evt) {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__cancel-button'))) {
      this.close();
    }
  }
  
  /*/слушатели
  setEventListeners() {
    this._popupSelector.addEventListener('keydown',this._handleEscClose); //закрытие popup'ов
    document.addEventListener('click',this.close);
  }*/
}