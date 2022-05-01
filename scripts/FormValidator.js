const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor (validationObject,formElement) {
    this._formElement = formElement;
    this._validationObject.inputErrorClass = validationObject.inputErrorClass;
    this._validationObject.errorClass = validationObject.errorClass;
    this._validationObject.inactiveButtonClass = validationObject.inactiveButtonClass;
    this._validationObject.formSelector = validationObject.formSelector;
    this._validationObject.inputSelector = validationObject.inputSelector;
    this._validationObject.submitButtonSelector = validationObject.submitButtonSelector;
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError (formElement, inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(this._validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationObject.errorClass);
  };

  _hideInputError (formElement, inputElement) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this._validationObject.inputErrorClass);
    errorElement.classList.remove(this._validationObject.errorClass);
    errorElement.textContent = '';
  }; 

  _hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._validationObject.inactiveButtonClass);
      buttonElement.disabled=true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._validationObject.inactiveButtonClass);
      buttonElement.disabled=false;
    }
  };

  //проверяем валидацию
  _isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement);
    }
  };

  enableValidation() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(this._validationObject.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  _setEventListeners() {
    // Найдём все поля формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(this._validationObject.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(this._validationObject.submitButtonSelector);
    toggleButtonState(inputList,buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList,buttonElement);
      });
    });
  };
}