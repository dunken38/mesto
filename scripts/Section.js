//создаем класс для создания :) карточек
export class Section {
  constructor(data, containerSelector) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  //отрисовка элементов
  renderer() {
    
  }
  //отрисовка элементов
  addItem(pastedCardElement) {
    this._containerSelector.prepend(pastedCardElement);
  }
}