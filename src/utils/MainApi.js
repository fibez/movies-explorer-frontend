import Cookies from 'js-cookie';
import { MAIN_API_URL } from './config/url';
//

class MainApi {
    constructor(address) {
        this._address = address;
    }

    _request(path, method, body) {
        return fetch(`${this._address}/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
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

    updateUserInfo(email, name) {
        const body = JSON.stringify({
            email: email,
            name: name,
        });
        return this._request('users/me', 'PATCH', body);
    }

    getSavedMovies() {
        return this._request('movies', 'GET');
    }

    addMovie(movieData) {
        const body = JSON.stringify({
            country: movieData.country,
            director: movieData.director,
            duration: movieData.duration,
            year: movieData.year,
            description: movieData.description,
            image: movieData.image,
            trailerLink: movieData.trailerLink,
            nameRU: movieData.nameRU,
            nameEN: movieData.nameEN,
            thumbnail: movieData.thumbnail,
            movieId: movieData.movieId,
        });

        console.log(movieData);
        return this._request('movies', 'POST', body);
    }

    deleteMovie(_id) {
        return this._request(`movies/${_id}`, 'DELETE');
    }
}

const mainApi = new MainApi(MAIN_API_URL);
// const mainApi = new MainApi(MAIN_API_URL, Cookies.get('jwt'));

export default mainApi;
