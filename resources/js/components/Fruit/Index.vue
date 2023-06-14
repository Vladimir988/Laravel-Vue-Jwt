<template>
    <div class="mt-3">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="fruit in fruits">
                <th scope="row">{{ fruit.id }}</th>
                <td>{{ fruit.name }}</td>
                <td>{{ fruit.price }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            fruits: null,
            api: null,
        }
    },
    methods: {
        getFruits() {
            this.api.get('/api/auth/fruits', {
                // headers: {
                //     'authorization': `Bearer ${this.getCookie('access_token')}`,
                // }
            }).then(response => {
                this.fruits = response.data.data;
            });
        },
        initApi() {
            const api = axios.create();
            api.interceptors.request.use(config => {
                if(this.getCookie('access_token')) {
                    config.headers = {
                        'authorization': `Bearer ${this.getCookie('access_token')}`,
                    };
                }
                return config;
            }, error => {});

            api.interceptors.response.use(config => {
                if(this.getCookie('access_token')) {
                    config.headers = {
                        'authorization': `Bearer ${this.getCookie('access_token')}`,
                    };
                }
                return config;
            }, error => {
                if(error.response.status === 401) {
                    this.$router.push({name: 'users.login'});
                }
            });

            this.api = api;
        },
        getCookie(cname) {
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
    },
    mounted() {
        this.initApi();
        this.getFruits();
    }
}
</script>

<style scoped>

</style>
