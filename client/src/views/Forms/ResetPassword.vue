<template>
    <div class="container">
        <form novalidate class="g-3 needs-validation" @onsubmit.prevent>
            <div class="col-12">
                <label for="password" class="form-label"><b>Password</b></label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    :class="validFormInput(invalidPasswordMsg)"
                    v-model="password"
                    required
                />
                <div class="invalid-tooltip">
                    {{ invalidPasswordMsg }}
                </div>
            </div>
            <div class="col-12">
                <label for="password" class="form-label"
                    ><b>Repeat Password</b></label
                >
                <input
                    type="password"
                    class="form-control"
                    id="repeat-password"
                    :class="validFormInput(invalidRepeatPasswordMsg)"
                    v-model="repeatPassword"
                    required
                />
                <div class="invalid-tooltip">
                    {{ invalidRepeatPasswordMsg }}
                </div>
            </div>

            <div class="col-12">
                <button
                    :class="{
                        'is-invalid': resetPasswordErrMessage,
                        disabled: !isFormValid
                    }"
                    class="btn btn-primary"
                    :disabled="!isFormValid"
                    type="submit"
                    @click.prevent="resetPassword"
                >
                    Reset Password
                </button>
                <div class="invalid-tooltip">
                    {{ resetPasswordErrMessage }}
                </div>
            </div>
            <div class="col-2">
                <router-link :to="loginPath">Login</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import {routesPaths} from "@/router/routes";
    import {mapGetters} from "vuex";
    import {routerUtil} from "@/mixin/routerUtil";
    import {userService} from "@/services/userService";

    export default {
        name: "Register",
        mixins: [routerUtil],
        data() {
            return {
                password: "",
                repeatPassword: "",
                resetPasswordErrMessage: "",
                termsAndConditionChecked: false,
                loginPath: routesPaths.login,
                termsAndCondition: routesPaths.termsAndCondition,
                resetPasswordAttempts: 0
            };
        },
        computed: {
            ...mapGetters(["user"]),
            invalidPasswordMsg() {
                if (this.password === "") {
                    return "password is empty";
                }
                return "";
            },
            invalidRepeatPasswordMsg() {
                if (this.repeatPassword === "") {
                    return "repeat password is empty";
                }
                return "";
            },
            isFormValid() {
                return (
                    !this.invalidRepeatPasswordMsg && !this.invalidPasswordMsg
                );
            }
        },
        methods: {
            validFormInput(input) {
                return input === "" ? "" : "is-invalid";
            },
            resetPassword() {
                this.resetPasswordAttempts++;
                if (this.password !== this.repeatPassword) {
                    this.resetPasswordErrMessage =
                        "The 2 passwords doesn't match";
                } else {
                    userService
                        .changePassword(this.user.email, this.password)
                        .then(({error}) => {
                            if (error) {
                                this.resetPasswordErrMessage = error;
                            } else {
                                this.navigateToRoute(routesPaths.login);
                            }
                        })
                        .catch(err => {
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
