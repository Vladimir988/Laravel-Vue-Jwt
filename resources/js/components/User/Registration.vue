<template>
    <div>
        <div class="mt-3">
            <input v-model="name" type="text" class="form-control mb-3" placeholder="Name">
            <input v-model="email" type="email" class="form-control mb-3" placeholder="Email">
            <input v-model="password" type="password" class="form-control mb-3" placeholder="Password">
            <input v-model="password_confirmation" type="password" class="form-control mb-3" placeholder="Confirm password">
            <input @click.prevent="store" type="submit" class="btn btn-outline-success">
        </div>
    </div>
</template>

<script>
export default {
    name: "Registration",
    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
        }
    },
    methods: {
        store() {
            axios.post('/api/users', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }).then(response => {
                console.log(response);
            });
        }
    }
}
</script>

<style scoped>

</style>
