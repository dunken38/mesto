//тут делаем обработку кнопки edit
let page = document.querySelector('.page');
let editButton = document.querySelector('.profile__info-edit-button');
let infoWindow = page.querySelector('.infowindow');
function profileInfoWindow() {
  infoWindow.classList.remove('infowindow_hide');
}
editButton.addEventListener('click',profileInfoWindow); //открываем окошко infowindow по клику на edit

//дальше пытаемся сделать кнопку cancel
let cancelButton = page.querySelector('.infowindow__cancel-button');
function hideProfileInfoWindow(evt) {
  evt.preventDefault();
  infoWindow.classList.add('infowindow_hide');
}
cancelButton.addEventListener('click',hideProfileInfoWindow); //закрываем окошко infowindow по клику на крестик

//и дальше кнопку save с заменой полей из infowindow в profile
let profileInfoName = page.querySelector('.profile__info-name');
let profileInfoAbout = page.querySelector('.profile__info-about');
let inputName = page.querySelector('.infowindow__name');
let inputAbout = page.querySelector('.infowindow__about');
let saveButton = page.querySelector('.infowindow__save-button');
function getValueOfInput(evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  infoWindow.classList.add('infowindow_hide');
}
saveButton.addEventListener('click',getValueOfInput); //закрываем окошко infowindow по клику на Сохранить
