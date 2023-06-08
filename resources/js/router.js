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
        }
    ],
});
