import {isNil} from "utilly";

export const routerUtil = {
    methods: {
        navigateToRoute(routePath) {
            if (!isNil(routePath) && this.$route.path !== routePath) {
                this.$router.push(routePath).catch(err => {
                    console.error(err);
                });
            }
        }
    }
};
