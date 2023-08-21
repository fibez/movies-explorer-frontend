import { MAIN_API_URL } from './config/url';

const HEADERS = {
    'Content-Type': 'application/json',
};

class Auth {
    constructor({ address, headers }) {
        this._address = address;
        this._headers = headers;
    }

    _request(path, method, body) {
        return fetch(`${this._address}/${path}`, {
            method: method,
            headers: this._headers,
            body: body,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    _checkResponse(res) {
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        return res.json();
    }

    register(password, email, name) {
        const body = JSON.stringify({
            email: email,
            password: password,
            name: name,
        });

        return this._request('signup', 'POST', body);
    }

    login(email, password) {
        const body = JSON.stringify({
            email: email,
            password: password,
        });

        return this._request('signin', 'POST', body);
    }
}

const auth = new Auth({
    address: MAIN_API_URL,
    headers: HEADERS,
});

export default auth;
