<template>
    <div>
        <router-link :to="{ name: 'fruit.index' }">List</router-link>
        <router-link v-if="!token" :to="{ name: 'users.login' }">Login</router-link>
        <router-link v-if="!token" :to="{ name: 'users.registration' }">Registration</router-link>
        <router-link v-if="token" :to="{ name: 'users.personal' }">Personal</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import cookie from "../cookie";
export default {
    name: "Index",
    data() {
        return {
            token: null,
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
