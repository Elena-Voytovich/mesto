class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(params) {
    console.log(params);
    return fetch(this._baseUrl + params.path, {
      method: params.method,
      headers: this._headers,
      body: JSON.stringify(params.body),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error code ${res.status}: ${res.message}`);
    })
  }

  getUserInfo() {
    return this._request({
      path: '/users/me',
      method: 'GET'
    })
  }

  updateUserInfo(info) {
    console.log(info)
    return this._request({
      path: '/users/me',
      method: 'PATCH',
      body: info
    })
  }

  getCards() {
    return this._request({
      path: '/cards',
      method: 'GET'
    })
  }

  addCard(info) {
    return this._request({
      path: '/cards',
      method: 'POST',
      body: info
    })
  }

  deleteCard(cardId) {
    return this._request({
      path: `/cards/${cardId}`,
      method: 'DELETE',
    });
  }

  addLike(cardId) {
    return this._request({
      path: `/cards/likes/${cardId}`,
      method: 'PUT',
    });
  }

  deleteLike(cardId) {
    return this._request({
      path: `/cards/likes/${cardId}`,
      method: 'DELETE',
    });
  }

  editAvatarImage(link) {
    return this._request({
      path: '/users/me/avatar',
      method: 'PATCH',
      body: {
        avatar: link.linkChangeAvatar
      }
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '0ea190f7-db7a-41d1-85b1-de23df027298',
    'Content-Type': 'application/json'
  }
})
