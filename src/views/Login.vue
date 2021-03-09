<template>
    <div class="container">
        <form novalidate class="g-3 needs-validation" @onsubmit.prevent>
            <div class="col-12">
                <label for="username" class="form-label"><b>Username</b></label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    required
                />
            </div>
            <div class="col-12">
                <label for="password" class="form-label"><b>Password</b></label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                />
            </div>

            <div class="col-12">
                <button
                    :class="loginErrMsg ? 'is-invalid' : ''"
                    class="btn btn-primary"
                    type="submit"
                    @click.prevent="login"
                >
                    Login
                </button>
                <div class="invalid-tooltip">
                    {{ loginErrMsg }}
                </div>
            </div>
            <div class="col-2">
                <router-link :to="registerPath">Register</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services/userService";
    import {routesPaths} from "@/router/routes";
    export default {
        name: "Login",
        beforeCreate() {
            if (this.$store.getters.user !== null) {
                this.$router.push(routesPaths.user);
            }
        },
        data() {
            return {
                username: "",
                password: "",
                loginAttempts: 0,
                loginErrMsg: "",
                registerPath: routesPaths.register
            };
        },
        mounted() {},
        methods: {
            validateForm() {
                if (this.username === "") {
                    return "empty username";
                }
                if (this.password === "") {
                    return "empty password";
                }
            },

            login() {
                this.loginAttempts++;
                this.loginErrMsg = this.validateForm();
                if (!this.loginErrMsg) {
                    userService
                        .getAccount(this.username, this.password)
                        .then(user => {
                            if (user !== null) {
                                this.$store.commit("loginUser", user);
                                this.$router.push(routesPaths.user);
                            } else {
                                this.loginErrMsg = "invalid username/password";
                            }
                        })
                        .catch(err => {
                            this.loginErrMsg =
                                "server error, please try again later";
                            console.log(err);
                        });
                }
            }
        }
    };
</script>

<style scoped>
    .container {
        padding: 16px;
    }
    form {
        border: 3px solid #f1f1f1;
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

    .col-12 {
        margin-bottom: 35px;
    }

    .invalid-tooltip {
        left: inherit;
    }
</style>
