<template>
    <div>
        <div class="topnav">
            <template v-for="(route, index) in routes">
                <router-link
                    class="topnav-item route-item"
                    v-if="!route.hidden"
                    :key="index"
                    :to="route.path"
                    >{{ route.name }}</router-link
                >
            </template>
            <AccountBar class="topnav-item account-bar"></AccountBar>
        </div>
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
    .topnav {
        display: flex;
        align-items: center;
        background-color: #333;
        height: 50px;
        & > .topnav-item {
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 17px;
        }
        & > .route-item {
            &:active {
                background-color: #4caf50;
                color: white;
            }
            &:hover {
                background-color: #ddd;
                color: black;
            }
        }
    }
    .account-bar {
        margin-left: auto;
    }
</style>
