//тут делаем обработку кнопки edit
let page = document.querySelector('.page');
let editButton = document.querySelector('.profile__info-edit-button');
let infowindowform = `<div class="infowindow">
<form class="infowindow__cancel-button-block">
  <button class="infowindow__cancel-button" title="Отмена"></button>
</form>
<form class="infowindow__content">
  <h2 class="infowindow__title">Редактировать профиль</h2>
  <input type="text" value="Жак-Ив Кусто" class="infowindow__name"></input>
  <input type="text" value="Исследователь океана" class="infowindow__about"></input>
  <button type="submit" class="infowindow__save-button">Сохранить</button>
</form>
</div>`;
function profileInfoWindow() {
  page.insertAdjacentHTML('beforeend', infowindowform)
}
editButton.addEventListener('click',profileInfoWindow);

//дальше пытаемся сделать кнопку cancel
let infoWindowFormParser = new DOMParser();//тут начинаем парсить текстовый блок infowindowform,который используется в insertAdjacentHTML
let newParsedPage = infoWindowFormParser.parseFromString(infowindowform, 'text/html')
let infoWindowClass = newParsedPage.querySelector('.infowindow');
let cancelButton = infoWindowClass.querySelector('.infowindow__cancel-button');
function hideProfileInfoWindow() {
  infoWindowClass.classList.add('infowindow_hide');
}
cancelButton.addEventListener('click',hideProfileInfoWindow);

//и дальше кнопку save
let inputName = newParsedPage.querySelector('.infowindow__name');
let inputAbout = newParsedPage.querySelector('.infowindow__about');
let saveButton = newParsedPage.querySelector('.infowindow__save-button');
let profileInfoName = page.querySelector('.profile__info-name');
let profileInfoAbout = page.querySelector('.profile__info-about');
console.log(inputName.value);
console.log(inputAbout.value);
function getValueOfInput() {
  
  profileInfoName.insertAdjacentText('afterbegin', inputName.value);
  
}
saveButton.addEventListener('click',getValueOfInput);

