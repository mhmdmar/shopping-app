<template>
    <div class="topnav">
        <router-link
            class="topnav-item left"
            v-for="(route, i) in routes"
            :key="i"
            :to="route.path"
            >{{ route.name }}</router-link
        >
        <AccountBar class="topnav-item right"></AccountBar>
    </div>
</template>

<script>
    const routes = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About",
            path: "/about"
        }
    ];
    import AccountBar from "@/components/AccountBar.vue";
    export default {
        name: "Topbar.vue",
        components: {
            AccountBar
        },
        data() {
            return {
                routes
            };
        }
    };
</script>

<style scoped lang="scss">
    .topnav {
        overflow: hidden;
        background-color: #333;
        & > .topnav-item {
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 17px;
            &:hover {
                background-color: #ddd;
                color: black;
            }
            &:active {
                background-color: #4caf50;
                color: white;
            }
        }
    }
    .right {
        float: right;
    }
    .left {
        float: left;
    }
</style>
