//объявляем переменные
const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__info-edit-button');
const popup = page.querySelector('.popup');
const popupEditForm = popup.querySelector('.popup__edit-form');
const cancelButton = page.querySelector('.popup__cancel-button');
const profileInfoName = page.querySelector('.profile__info-name');
const profileInfoAbout = page.querySelector('.profile__info-about');
const inputName = popupEditForm.querySelector('.popup__input_name');
const inputAbout = popupEditForm.querySelector('.popup__input_about');

//тут делаем добавление и удаление классов popup.* для появления и закрытия окошка
const popupOpenClose = () => {
  popup.classList.toggle('popup_active');
  popup.classList.toggle('popup');
  inputName.value = profileInfoName.textContent; //получаем данные в форму из информации со страницы
  inputAbout.value = profileInfoAbout.textContent;
}

//и дальше кнопку save с заменой полей из popup в profile
const getValueOfInput = (evt) => { 
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  popupOpenClose(); //тут закрываем форму без отправки на сервер
}

//слушатели
editButton.addEventListener('click',popupOpenClose); //открываем окошко popup по клику на edit
cancelButton.addEventListener('click',popupOpenClose); //закрываем окошко popup по клику на крестик
popupEditForm.addEventListener('submit',getValueOfInput,false); //закрываем окошко popup по клику на Сохранить.False добавлен для того чтобы форма не обновлялась.