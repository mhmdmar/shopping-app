<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#"
                ><router-link class="app-title" :to="homePath"
                    >Shopping App</router-link
                ></b-navbar-brand
            >
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        href="#"
                        v-for="(route, index) in visibleRoutes"
                        :key="index"
                    >
                        <router-link
                            class="route-item"
                            :key="index"
                            :to="route.path"
                            >{{ route.name }}</router-link
                        >
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <div class="right-menu-container">
                        <SearchBar
                            :suggestions="suggestions"
                            @suggestionChosen="suggestionChosen"
                        ></SearchBar>
                        <AccountBar class="account-bar"></AccountBar>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {routes, routesPaths} from "@/router/routes.js";
    import AccountBar from "@/components/AccountBar.vue";
    import SearchBar from "@/components/SearchBar";
    import {mapGetters} from "vuex";
    import {routerUtil} from "@/mixin/routerUtil";
    export default {
        name: "Topbar.vue",
        components: {
            SearchBar,
            AccountBar
        },
        mixins: [routerUtil],
        data() {
            return {
                routes,
                homePath: routesPaths.home,
                productPath: routesPaths.product,
                selection: ""
            };
        },
        computed: {
            ...mapGetters(["products"]),
            suggestions() {
                return this.products?.map(product => product.title);
            },
            visibleRoutes() {
                return this.routes?.filter(
                    route => route.meta?.hidden !== true
                );
            }
        },
        methods: {
            suggestionChosen(itemIndex) {
                const product = this.products[itemIndex];
                if (product) {
                    this.navigateToRoute(`${this.productPath}/${product.id}`);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .account-bar {
        color: #ffffff;
    }
    .route-item {
        color: #ffffff;
    }
    .active {
        color: green;
    }
    .app-title {
        color: inherit;
        text-decoration: inherit;
        background-color: inherit;
    }
    .right-menu-container {
        @media (min-width: 700px) {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
</style>
