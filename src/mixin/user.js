import {isNil} from "utilly";
import {routesPaths} from "@/router/routes";

export const userMixin = {
    mounted() {
        if (!isNil(this.user)) {
            this.$router.push(routesPaths.user).catch(err => {
                console.error(err);
            });
        }
    }
};
