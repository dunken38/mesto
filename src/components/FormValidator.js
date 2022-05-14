export class FormValidator {
  constructor (validationObject,formClass) {
    this._formElement = document.querySelector(formClass);
    this._input = validationObject.input;
    this._submitButton = validationObject.submitButton;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._errorClass = validationObject.errorClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._buttonElement = this._formElement.querySelector(this._submitButton);
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError (inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    // Находим элемент ошибки
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }; 

  _hasInvalidInput () {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.disabledAddButton(); //вынес выключение кнопки в эту ф-цию чтобы не дублировать код
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled=false;
    }
  };

  disabledAddButton() { //возвращаем кнопку в disabled сразу после сабмита в окошке Add
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled=true;
  }

  //проверяем валидацию
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };

  resetErrors() { //чистим ошибки валидации
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    this._setEventListeners();
  };
  
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  };
}