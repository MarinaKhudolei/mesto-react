class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getAllCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
    }

    addCard(data) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.formTitle,
                link: data.formImageLink,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
    }

    setProfileInfo() {
        return fetch(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
    }

    changeProfileInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.formName,
                about: data.formProf,
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        })
    }

    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.formAvatarLink
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        })
    }

    addLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
    }

    removeLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка');
        });
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