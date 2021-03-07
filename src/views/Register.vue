<template>
    <div class="container">
        <label for="email"><b>Email</b></label>
        <input
            v-model="email"
            type="text"
            placeholder="Enter Username"
            name="email"
            id="email"
            required
        />
        <label for="username"><b>Username</b></label>
        <input
            v-model="username"
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
            required
        />

        <label for="password"><b>Password</b></label>
        <input
            v-model="password"
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            required
        />

        <button type="submit" @click="register">Register</button>
        <router-link :to="loginPath">Login</router-link>
    </div>
</template>

<script>
    import {routesPaths} from "@/router/routes";
    export default {
        name: "Register",
        beforeCreate() {
            if (this.$store.getters.user !== null) {
                this.$router.push(routesPaths.user);
            }
        },
        data() {
            return {
                username: "",
                password: "",
                email: "",
                loginPath: routesPaths.login
            };
        },
        mounted() {},
        methods: {
            register() {
                console.log("Sign up");
            }
        }
    };
</script>

<style scoped>
    form {
        border: 3px solid #f1f1f1;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    button {
        background-color: #4caf50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        opacity: 0.8;
    }

    .container {
        padding: 16px;
    }
</style>
