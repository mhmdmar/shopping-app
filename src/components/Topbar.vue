<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Shopping App</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        href="#"
                        v-for="(route, index) in routes"
                        :key="index"
                    >
                        <router-link
                            class="route-item"
                            v-if="!route.hidden"
                            :key="index"
                            :to="route.path"
                            >{{ route.name }}</router-link
                        >
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <AccountBar class="account-bar"></AccountBar>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {routes} from "@/router/routes.js";
    import AccountBar from "@/components/AccountBar.vue";
    export default {
        name: "Topbar.vue",
        components: {
            AccountBar
        },
        computed: {},
        data() {
            return {
                routes
            };
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
</style>
