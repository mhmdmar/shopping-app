import Home from "@/views/Home";

export const routesPaths = {
    home: "/",
    about: "/about",
    login: "/login",
    register: "/register",
    user: "/user",
    cartRoom: "/cartRoom",
    product: "/product/:id",
    termsAndCondition: "/termsAndCondition",
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
        meta: {
            hidden: true
        },
        component: () =>
            import(/* webpackChunkName: "login" */ "@/views/Login.vue")
    },
    {
        path: routesPaths.register,
        name: "Register",
        meta: {
            hidden: true
        },
        component: () =>
            import(/* webpackChunkName: "login" */ "@/views/Register.vue")
    },
    {
        path: routesPaths.user,
        name: "User",
        meta: {
            requiredAuth: true,
            hidden: true
        },
        component: () =>
            import(/* webpackChunkName: "user" */ "@/views/User.vue")
    },
    {
        path: routesPaths.product,
        name: "Product",
        meta: {
            hidden: true
        },
        component: () =>
            import(/* webpackChunkName: "user" */ "@/views/ProductPage.vue")
    },
    {
        path: routesPaths.cartRoom,
        name: "CartRoom",
        meta: {
            requiredAuth: true,
            hidden: true
        },
        component: () =>
            import(/* webpackChunkName: "user" */ "@/views/CartRoom.vue")
    },
    {
        path: routesPaths.termsAndCondition,
        name: "TermsAndConditions",
        meta: {
            hidden: true
        },
        component: () =>
            import(
                /* webpackChunkName: "user" */ "@/views/TermsAndConditions.vue"
            )
    },
    {
        path: routesPaths.notFound,
        name: "NotFound",
        alias: "*",
        meta: {
            hidden: true
        },
        component: () =>
            import(/* webpackChunkName: "notFound" */ "@/views/NotFound.vue")
    }
];
