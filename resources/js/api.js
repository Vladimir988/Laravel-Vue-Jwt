import axios from "axios";
import router from "./router";

const api = axios.create();

// request
api.interceptors.request.use(config => {
    if(getCookie('access_token')) {
        config.headers.authorization = `Bearer ${getCookie('access_token')}`;
    }
    return config;
}, error => {});

// response
api.interceptors.response.use(config => {
    if(getCookie('access_token')) {
        config.headers.authorization = `Bearer ${getCookie('access_token')}`;
    }
    return config;
}, error => {
    if(error.response.data.message === 'Token has expired') {
        return axios.post('/api/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${getCookie('access_token')}`
            }
        }).then(response => {
            setCookie('access_token', response.data.access_token, 1);
            error.config.headers.authorization = `Bearer ${response.data.access_token}`;
            return api.request(error.config);
        });
    } else {
        router.push({name: 'users.login'});
    }
});

function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(name, value, lifetime) {
    const d = new Date();
    d.setTime(d.getTime() + (lifetime * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export default api;
