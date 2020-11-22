class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getAllCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers,
        }).then(this._getResponseData);
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponseData);
    }

    addCard(data) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._getResponseData);
    }

    setProfileInfo() {
        return fetch(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._getResponseData);
    }

    changeProfileInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._getResponseData);
    }

    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._getResponseData);
    }

    changeLikeCardStatus(cardId, state) {
        if (state) {
            return fetch(`${this._url}cards/likes/${cardId}`, {
                method: "PUT",
                headers: this._headers,
            }).then(this._getResponseData);
        } else {
            return fetch(`${this._url}cards/likes/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            }).then(this._getResponseData);
        }
    }
}

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-15/",
    headers: {
        authorization: "30a3bd81-193f-43b5-9132-49b9701e93a2",
        "content-type": "application/json",
    },
});

export default api;
