//создаем класс для управления профилем пользователя
export class UserInfo {
  constructor({profileInfoName,profileInfoAbout,profileInfoAvatar}) {
    this._profileInfoName = profileInfoName;
    this._profileInfoAbout = profileInfoAbout;
    this._profileInfoAvatar = profileInfoAvatar;
  }
  getUserInfo() {
    return { //тут объект с данными пользователя
      name: this._profileInfoName.textContent,
      about: this._profileInfoAbout.textContent
    }
  }
  setUserInfo(item) {
    this._profileInfoName.textContent = item.inputNameEdit;
    this._profileInfoAbout.textContent = item.inputAboutEdit;
  }
  setUserAvatar(item) {
    this._profileInfoAvatar.alt = item.inputNameEdit;
    this._profileInfoAvatar.src = item.avatar;
  }
}