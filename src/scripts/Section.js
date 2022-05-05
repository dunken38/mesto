//создаем класс для создания карточек
export class Section {
  constructor({items,renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  //создание элементов
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }
  //вставка элементов
  addItem(pastedCardElement) {
    this._containerSelector.prepend(pastedCardElement);
  }
}