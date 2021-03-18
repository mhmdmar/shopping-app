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

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.user !== null;
    let target;
    if (to.meta.requiredAuth && !isLoggedIn) {
        target = routesPaths.login;
    }
    next(target);
});
export default router;
