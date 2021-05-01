import {isNil} from "utilly";
import {routesPaths} from "@/router/routes";
import {userService} from "@/services/userService";
import {mapMutations} from "vuex";

export const userMixin = {
    mounted() {
        if (!isNil(this.user)) {
            this.$router.push(routesPaths.user).catch(err => {
                console.error(err);
            });
        }
    },
    methods: {
        ...mapMutations(["setIsLoading", "setUserSession"]),
        loginUser(email, password, cb) {
            this.setIsLoading(true);
            userService
                .getAccount(email, password)
                .then(response => {
                    const {error, user} = response;
                    if (!isNil(user)) {
                        this.setUserSession(user);
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
                    this.setIsLoading(false);
                });
        }
    }
};
