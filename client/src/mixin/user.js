import {isNil, isUndefined} from "utilly";
import {routesPaths} from "@/router/routes";
import {userService} from "@/services/userService";
import {mapActions, mapMutations} from "vuex";

export const userMixin = {
    mounted() {
        if (!isNil(this.user)) {
            this.$router.push(routesPaths.user).catch(err => {
                console.error(err);
            });
        }
    },
    methods: {
        ...mapMutations(["setIsLoading"]),
        ...mapActions(["setUserSession", "removeUserSession"]),
        loginUser(email, password, cb) {
            this.setIsLoading(true);
            userService
                .login(email, password)
                .then(payload => {
                    const {error, token, user, cart} = payload;
                    if (!isNil(token) && !isUndefined(token)) {
                        this.setUserSession({token, user, cart});
                        cb?.();
                    } else if (!isNil(error) && !isUndefined(error)) {
                        console.error(error);
                        cb?.(error);
                    }
                })

                .catch(error => {
                    this.removeUserSession();
                    cb?.(error);
                })
                .finally(() => {
                    this.setIsLoading(false);
                });
        }
    }
};
