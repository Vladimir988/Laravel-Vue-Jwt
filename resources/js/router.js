import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
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
        }
    ],
});
