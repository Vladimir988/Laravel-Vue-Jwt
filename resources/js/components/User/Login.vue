<template>
    <div class="mt-3">
        <input v-model="email" type="email" class="form-control mb-3" placeholder="Email">
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Password">
        <input @click.prevent="login" type="submit" class="btn btn-outline-success">
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        login() {
            axios.post('/api/auth/login', {
                email: this.email,
                password: this.password
            }).then(response => {
                if(response.status === 200) {
                    this.setCookie('access_token', response.data.access_token, 1);
                }
            });
        },
        setCookie(name, value, lifetime) {
            const d = new Date();
            d.setTime(d.getTime() + (lifetime * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }
    }
}
</script>

<style scoped>

</style>
