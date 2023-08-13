import { BEAT_FILM_API_URL } from './config/url';

class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
    }

    getMovies() {
        return this._request('/', {
            headers: this._headers,
        });
    }
}

const moviesApi = new MoviesApi({
    baseUrl: BEAT_FILM_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;
