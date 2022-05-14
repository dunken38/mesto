//создаем класс для управления профилем пользователя
export class UserInfo {
  constructor({profileInfoName,profileInfoAbout,profileInfoAvatar}) {
    this._profileInfoName = profileInfoName;
    this._profileInfoAbout = profileInfoAbout;
    this._profileInfoAvatar = profileInfoAvatar;
  }
  getUserInfo() {
    return { //тут объект с данными пользователя
      inputNameEdit: this._profileInfoName.textContent,
      inputAboutEdit: this._profileInfoAbout.textContent
    }
  }
  setUserInfo(item) {
    this._profileInfoName.textContent = item.name;
    this._profileInfoAbout.textContent = item.about;
  }
  setUserAvatar(item) {
    this._profileInfoAvatar.alt = item.name;
    this._profileInfoAvatar.src = item.avatar;
  }
}