import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import {routes} from "@/router/routes.js";

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
