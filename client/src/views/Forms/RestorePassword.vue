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
                <button
                    :class="resetPasswordMessage ? 'is-invalid' : ''"
                    class="btn btn-primary"
                    type="submit"
                    @click.prevent="restorePassword"
                >
                    Restore Password
                </button>
                <div class="invalid-tooltip">
                    {{ resetPasswordMessage }}
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services/userService";
    import {routesPaths} from "@/router/routes";
    import {mapGetters} from "vuex";
    import {userMixin} from "@/mixin/user";
    import {routerUtil} from "@/mixin/routerUtil";

    export default {
        name: "ResetPassword",
        mixins: [userMixin, routerUtil],
        data() {
            return {
                username: "",
                password: "",
                email: "",
                resetPasswordMessage: "",
                termsAndConditionChecked: false,
                termsAndCondition: routesPaths.termsAndCondition,
                restorePasswordAttempts: 0
            };
        },
        computed: {
            ...mapGetters(["user"]),
            validEmail() {
                return this.getValidateObject(() => {
                    if (!this.email.includes("@")) {
                        return "email isn't valid";
                    }
                });
            }
        },
        methods: {
            isFormValid() {
                return !this.validEmail.errMsg;
            },
            getValidateObject(isValidCallback) {
                if (this.restorePasswordAttempts === 0) {
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
            restorePassword() {
                this.restorePasswordAttempts++;
                if (this.isFormValid()) {
                    userService
                        .restorePassword(this.email)
                        .then(payload => {
                            const {error, data} = payload;
                            if (error) {
                                this.resetPasswordMessage = error;
                            } else {
                                this.resetPasswordMessage = data;
                            }
                        })
                        .catch(err => {
                            this.resetPasswordMessage =
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
