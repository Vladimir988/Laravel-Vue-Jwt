import axios from "axios";
import router from "./router";

const api = axios.create();

// request
api.interceptors.request.use(config => {
    if(getCookie('access_token')) {
        config.headers = {
            'authorization': `Bearer ${getCookie('access_token')}`,
        };
    }
    return config;
}, error => {});

// response
api.interceptors.response.use(config => {
    if(getCookie('access_token')) {
        config.headers = {
            'authorization': `Bearer ${getCookie('access_token')}`,
        };
    }
    return config;
}, error => {
    if(error.response.status === 401) {
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

export default api;
