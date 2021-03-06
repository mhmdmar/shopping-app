import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import {routes} from "@/router/routes.js";
import store from "@/store/index.js";
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    let target;
    if (to.meta.requiredAuth) {
        if (!store.getters.user) {
            target = "/login";
        }
    }
    next(target);
});
export default router;
