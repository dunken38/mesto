export class Api {
  constructor({baseUrl,authorization,contentType}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    this._contentType = contentType
  }

  _fetchResult() {
    return res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._fetchResult());
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._fetchResult());
  }

  patchUser(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: item.inputNameEdit,
        about: item.inputAboutEdit
      })
    })
      .then(this._fetchResult());
  }

  postCard(name,link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._fetchResult());
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._fetchResult());
  }

  putLikes(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._fetchResult());
  }

  deleteLikes(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._fetchResult());
  }

  patchAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(this._fetchResult());   
  }
}