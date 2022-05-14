//объявляем переменные
export const profileInfoName = document.querySelector('.profile__info-name');
export const profileInfoAbout = document.querySelector('.profile__info-about');
export const profileInfoAvatar = document.querySelector('.profile__avatar');
export const editButton = document.querySelector('.profile__info-edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__avatar-edit');
export const inputNameEdit = document.querySelector('.popup__input_type_name-edit'); 
export const inputAboutEdit = document.querySelector('.popup__input_type_about-edit');
export const validationObject = {
  formEdit: '.popup__form_type_edit',
  formAdd: '.popup__form_type_add',
  formAvatar: '.popup__form_type_avatar',
  input: '.popup__input',
  submitButton: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
