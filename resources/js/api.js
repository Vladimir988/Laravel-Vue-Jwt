import axios from "axios";
import router from "./router";
import cookie from "./cookie";

const api = axios.create();

// request
api.interceptors.request.use(config => {
    if(cookie.get('access_token')) {
        config.headers.authorization = `Bearer ${cookie.get('access_token')}`;
    }
    return config;
}, error => {});

// response
api.interceptors.response.use(config => {
    if(cookie.get('access_token')) {
        config.headers.authorization = `Bearer ${cookie.get('access_token')}`;
    }
    return config;
}, error => {
    if(error.response.data.message === 'Token has expired') {
        return axios.post('/api/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${cookie.get('access_token')}`
            }
        }).then(response => {
            cookie.set('access_token', response.data.access_token, 1);
            error.config.headers.authorization = `Bearer ${response.data.access_token}`;
            return api.request(error.config);
        });
    } else {
        router.push({name: 'users.login'});
    }
});

export default api;
