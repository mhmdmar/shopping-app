<template>
    <div class="container">
        <form novalidate class="g-3 needs-validation" @onsubmit.prevent>
            <div class="col-12">
                <label for="email" class="form-label"><b>Email</b></label>
                <input
                    type="text"
                    class="form-control"
                    id="email"
                    :class="validEmail.className"
                    v-model="email"
                    required
                />
                <div class="invalid-tooltip">
                    {{ validEmail.errMsg }}
                </div>
            </div>
            <div class="col-12">
                <label for="username" class="form-label"><b>Username</b></label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    :class="validUser.className"
                    v-model="username"
                    required
                />
                <div class="invalid-tooltip">
                    {{ validUser.errMsg }}
                </div>
            </div>
            <div class="col-12">
                <label for="password" class="form-label"><b>Password</b></label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    :class="validPassword.className"
                    v-model="password"
                    required
                />
                <div class="invalid-tooltip">
                    {{ validPassword.errMsg }}
                </div>
            </div>

            <div class="col-12">
                <div class="form-check">
                    <input
                        class="form-check-input"
                        :class="validTermsAndCondition.className"
                        type="checkbox"
                        value="agree"
                        v-model="termsAndConditionChecked"
                        id="termsAndConditions"
                        required
                    />
                    <label class="form-check-label" for="termsAndConditions">
                        Agree to the
                        <router-link :to="termsAndCondition">
                            terms and conditions
                        </router-link>
                    </label>
                    <div class="invalid-tooltip">
                        {{ validTermsAndCondition.errMsg }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <button
                    :class="registerErrMessage ? 'is-invalid' : ''"
                    class="btn btn-primary"
                    type="submit"
                    @click.prevent="register"
                >
                    Register
                </button>
                <div class="invalid-tooltip">
                    {{ registerErrMessage }}
                </div>
            </div>
            <div class="col-2">
                <router-link :to="loginPath">Login</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import {isNil, isUndefined} from "utilly";
    import {userService} from "@/services/userService";
    import {routesPaths} from "@/router/routes";
    import {mapGetters} from "vuex";
    import {userMixin} from "@/mixin/user";
    import {routerUtil} from "@/mixin/routerUtil";

    export default {
        name: "Register",
        mixins: [userMixin, routerUtil],
        data() {
            return {
                username: "",
                password: "",
                email: "",
                registerErrMessage: "",
                termsAndConditionChecked: false,
                loginPath: routesPaths.login,
                termsAndCondition: routesPaths.termsAndCondition,
                registrationAttempts: 0
            };
        },
        computed: {
            ...mapGetters(["user"]),
            validUser() {
                return this.getValidateObject(() => {
                    if (this.username === "") {
                        return "username can't be empty";
                    }
                });
            },
            validEmail() {
                return this.getValidateObject(() => {
                    if (!this.email.includes("@")) {
                        return "email isn't valid";
                    }
                });
            },
            validPassword() {
                return this.getValidateObject(() => {
                    if (this.password === "") {
                        return "password can't be empty";
                    }
                });
            },
            validTermsAndCondition() {
                return this.getValidateObject(() => {
                    if (!this.termsAndConditionChecked) {
                        return "You must agree before submitting";
                    }
                });
            }
        },
        methods: {
            isFormValid() {
                return (
                    !this.validUser.errMsg &&
                    !this.validEmail.errMsg &&
                    !this.validPassword.errMsg &&
                    !this.validTermsAndCondition.errMsg
                );
            },
            getValidateObject(isValidCallback) {
                if (this.registrationAttempts === 0) {
                    return {
                        className: "",
                        errMsg: ""
                    };
                }
                let errMsg = isValidCallback();
                let isValid = true;

                if (errMsg) {
                    isValid = false;
                }
                return {
                    className: this.getValidateClass(isValid),
                    errMsg: errMsg
                };
            },
            getValidateClass(isValid) {
                return isValid ? "is-valid" : "is-invalid";
            },
            register() {
                this.registrationAttempts++;
                if (this.isFormValid()) {
                    userService
                        .registerAccount(
                            this.email,
                            this.username,
                            this.password
                        )
                        .then(response => {
                            const {error, user} = response;
                            if (!isUndefined(user) && !isNil(user)) {
                                this.$store.commit("setUserSession", user);
                                this.navigateToRoute(routesPaths.home);
                            } else {
                                this.registerErrMessage = error;
                            }
                        })
                        .catch(err => {
                            this.registerErrMessage =
                                "server error, please try again later";
                            console.error(err);
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
