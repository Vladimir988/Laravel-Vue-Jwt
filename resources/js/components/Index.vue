<template>
    <div>
        <router-link :to="{ name: 'fruit.index' }">List</router-link>
        <router-link v-if="!token" :to="{ name: 'users.login' }">Login</router-link>
        <router-link v-if="!token" :to="{ name: 'users.registration' }">Registration</router-link>
        <router-link v-if="token" :to="{ name: 'users.personal' }">Personal</router-link>
        <a v-if="token" @click.prevent="logout" href="#">Logout</a>
        <router-view></router-view>
    </div>
</template>

<script>
import cookie from "../cookie";
import API from "../api";
export default {
    name: "Index",
    data() {
        return {
            token: null,
        }
    },
    methods: {
        logout() {
            API.post('/api/auth/logout').then(response => {
                cookie.set('access_token', '', 0);
                this.$router.push({name: 'users.login'});
            });
        }
    },
    updated() {
        this.token = cookie.get('access_token');
    },
    mounted() {
        this.token = cookie.get('access_token');
    }
}
</script>

<style scoped>

</style>
