export class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}) {
      this._name = document.querySelector(nameSelector);
      this._about = document.querySelector(aboutSelector);
      this._avatar = document.querySelector(avatarSelector);
    }

    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._id = data._id;
      this._avatar.alt = data.name;
    }
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
      }
    }

    getId() {
      return this._id;
    }

    setAvatar(data) {
      this._avatar.src = data.avatar;
    }
  }