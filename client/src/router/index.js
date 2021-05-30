import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import {routes, routesPaths} from "@/router/routes.js";
import store from "@/store/index.js";
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    linkExactActiveClass: "active"
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiredAuth && !store.getters.isLoggedIn) {
        next({path: routesPaths.login, query: {redirect: to.fullPath}});
    } else {
        next();
    }
});
export default router;
