import Home from "@/views/Home";

export const routesPaths = {
    home: "/",
    about: "/about",
    login: "/login",
    user: "/user",
    notFound: "/404"
};
export const routes = [
    {
        path: routesPaths.home,
        name: "Home",
        component: Home
    },
    {
        path: routesPaths.about,
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    {
        path: routesPaths.login,
        name: "Login",
        hidden: true,
        component: () =>
            import(/* webpackChunkName: "login" */ "@/views/Login.vue")
    },
    {
        path: routesPaths.user,
        name: "User",
        hidden: true,
        component: () =>
            import(/* webpackChunkName: "user" */ "@/views/User.vue"),
        meta: {
            requiredAuth: true
        }
    },
    {
        path: routesPaths.notFound,
        name: "NotFound",
        alias: "*",
        hidden: true,
        component: () =>
            import(/* webpackChunkName: "notFound" */ "@/views/NotFound.vue")
    }
];
