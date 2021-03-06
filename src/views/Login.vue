<template>
    <div class="container">
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

        <button type="submit" @click="login">Login</button>
    </div>
</template>

<script>
    import {userService} from "@/services/userService";
    import {routesPaths} from "@/router/routes";
    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: ""
            };
        },
        mounted() {},
        methods: {
            login() {
                userService
                    .getAccount(this.username, this.password)
                    .then(user => {
                        if (user !== null) {
                            this.$store.commit("setUser", user);
                            this.$router.push(routesPaths.user);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
