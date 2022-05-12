export class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
      headers: {
        authorization: '2c648237-6fa7-446a-a733-c0b86e95b124'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUser() {

  }

  patchUser() {

  }

  postCard() {

  }

  deleteCard() {

  }

  putLikes() {

  }

  deleteLikes() {

  }

  patchAvatar() {
    
  }
}

