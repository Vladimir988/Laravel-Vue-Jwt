import Vue from "vue";
import VueRouter from "vue-router";
import cookie from "./cookie";

Vue.use(VueRouter);

const route = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/fruits',
            name: 'fruit.index',
            component: () => import('./components/Fruit/Index'),
        },
        {
            path: '/users/login',
            name: 'users.login',
            component: () => import('./components/User/Login'),
        },
        {
            path: '/users/registration',
            name: 'users.registration',
            component: () => import('./components/User/Registration'),
        },
        {
            path: '/users/personal',
            name: 'users.personal',
            component: () => import('./components/User/Personal'),
        },
        {
            path: '*',
            name: '404',
            component: () => import('./components/404/NotFound.vue'),
        }
    ],
});

route.beforeEach((to, from, next) => {
    const token = cookie.get('access_token');

    if (!token) {
        if (to.name === 'users.login' || to.name === 'users.registration') {
            return next();
        } else {
            return next({
                name: 'users.login'
            });
        }
    }

    if (to.name === 'users.login' && token) {
        return next({
            name: 'users.personal'
        });
    }

    next();
});

export default route;
