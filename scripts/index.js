//объявляем переменные
const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__info-edit-button');
const popup = page.querySelector('.popup');
const popupActive = popup.querySelector('.popup_active');
const popupEditForm = popup.querySelector('[name=popup-edit-form]'); //отбор всех form сделал по именам чтобы удалить лишние классы
const cancelButton = page.querySelector('.popup__cancel-button');
const profileInfoName = page.querySelector('.profile__info-name');
const profileInfoAbout = page.querySelector('.profile__info-about');
const inputName = popupEditForm.querySelector('[name=input-name]'); 
const inputAbout = popupEditForm.querySelector('[name=input-about]');

//открываем окошко
const popupOpen = () => {
  popup.classList.add('popup_active');
  inputName.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAbout.value = profileInfoAbout.textContent;
}

//закрываем окошко
const popupClose = () => {
  popup.classList.remove('popup_active');
}

//и дальше кнопку save с заменой полей из popup в profile
const getValueOfInput = (evt) => { 
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  popupClose(); //тут закрываем форму без отправки на сервер
}

//слушатели
editButton.addEventListener('click',popupOpen); //открываем окошко popup по клику на edit
cancelButton.addEventListener('click',popupClose); //закрываем окошко popup по клику на крестик
popupEditForm.addEventListener('submit',getValueOfInput,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.