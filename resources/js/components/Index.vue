<template>
    <div>
        <router-link :to="{ name: 'fruit.index' }">List</router-link>
        <router-link :to="{ name: 'users.login' }">Login</router-link>
        <router-link :to="{ name: 'users.registration' }">Registration</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>

<style scoped>

</style>
