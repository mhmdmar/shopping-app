import {isNil} from "utilly";
import {routesPaths} from "@/router/routes";
import {userService} from "@/services/userService";

export const userMixin = {
    mounted() {
        if (!isNil(this.user)) {
            this.$router.push(routesPaths.user).catch(err => {
                console.error(err);
            });
        }
    },
    methods: {
        loginUser(email, password, cb) {
            this.$store.commit("setIsLoading", true);
            userService
                .getAccount(email, password)
                .then(response => {
                    const {error, user} = response;
                    if (!isNil(user)) {
                        this.$store.commit("setUserSession", user);
                        this.$store.dispatch("setCartItems", user.cart);
                        cb?.();
                    } else if (!isNil(error)) {
                        console.error(error);
                        cb?.(error);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    this.$store.commit("setIsLoading", false);
                });
        }
    }
};
