import Cookies from 'js-cookie';
import { MAIN_API_URL } from './config/url';
//

class MainApi {
    constructor(address) {
        this._address = address;
    }

    _request(path, method, body) {
        console.log(body);
        return fetch(`${this._address}/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            // credentials: 'include',
            body: body,
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return this._request('users/me', 'GET');
    }

    updateUserInfo(userData) {
        console.log(userData);
        const body = JSON.stringify({
            email: userData.email,
            name: userData.name,
        });
        return this._request('users/me', 'PATCH', body);
    }

    getMovies() {
        return fetch(`${this._address}/movies`, {
            method: 'GET',
            credentials: 'include',
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    addMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
    }) {
        return fetch(`${this._address}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
                thumbnail,
                movieId,
            }),
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    deleteMovie(_id) {
        return fetch(`${this._address}/movies/${_id}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then((res) => {
            return this._getResponseData(res);
        });
    }
}

const mainApi = new MainApi(MAIN_API_URL);
// const mainApi = new MainApi(MAIN_API_URL, Cookies.get('jwt'));

export default mainApi;
