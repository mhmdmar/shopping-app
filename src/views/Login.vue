<template>
    <div class="container">
        <form
            novalidate
            class="g-3 needs-validation"
            @onsubmit.prevent
            v-if="isNil(user)"
        >
            <div class="col-12">
                <label for="email" class="form-label"><b>Email</b></label>
                <input
                    type="text"
                    class="form-control"
                    id="email"
                    v-model="email"
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
    import {routesPaths} from "@/router/routes.js";
    import {mapGetters, mapMutations} from "vuex";
    import {userMixin} from "@/mixin/user.js";
    import {utillyMixin} from "@/mixin/utilly.js";
    import {routerUtil} from "@/mixin/routerUtil";

    export default {
        name: "Login",
        mixins: [userMixin, utillyMixin, routerUtil],
        data() {
            return {
                email: "",
                password: "",
                loginAttempts: 0,
                loginErrMsg: "",
                registerPath: routesPaths.register
            };
        },
        computed: {
            ...mapGetters(["user"])
        },
        methods: {
            ...mapMutations(["setIsLoading"]),
            validateForm() {
                if (this.email === "") {
                    return "empty email";
                }
                if (this.password === "") {
                    return "empty password";
                }
            },
            login() {
                this.loginAttempts++;
                this.loginErrMsg = this.validateForm();
                if (!this.loginErrMsg) {
                    this.loginUser(this.email, this.password, () => {
                        this.navigateToRoute(routesPaths.home);
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
