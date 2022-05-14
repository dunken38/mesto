//создаем класс для создания карточек
export class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }
  //создание элементов
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }
  //вставка элементов
  addItem(pastedCardElement) {
    this._container.prepend(pastedCardElement);
  }
}