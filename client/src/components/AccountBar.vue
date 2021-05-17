<template>
    <div class="account-bar-container">
        <div class="account-container" v-if="!isNil(user)">
            <CartHeader
                class="cart-header border-right"
                :cartSize="cartSize"
            ></CartHeader>
            <div class="bar-container">
                <b-img
                    :src="userProfilePicture"
                    thumbnail
                    fluid
                    :alt="username"
                />
                <div class="username">
                    <span class="ellipses">{{ username }}</span>
                </div>
            </div>
            <b-dropdown id="dropdown-right" right variant="primary" class="s-1">
                <b-dropdown-item href="#">Placeholder</b-dropdown-item>
                <b-dropdown-item href="#">Placeholder</b-dropdown-item>
                <b-dropdown-item href="#">Placeholder</b-dropdown-item>
                <div class="dropdown-divider"></div>
                <b-dropdown-item href="#" @click="navigateToRoute(userPath)"
                    >Settings</b-dropdown-item
                >
                <b-dropdown-item href="#" @click="logout"
                    >Logout</b-dropdown-item
                >
            </b-dropdown>
        </div>
        <div v-else>
            <router-link :to="loginPath">Login</router-link>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import {routesPaths} from "@/router/routes";
    import {utillyMixin} from "@/mixin/utilly.js";
    import {routerUtil} from "@/mixin/routerUtil";
    import CartHeader from "@/components/CartHeader";
    export default {
        name: "AccountBar",
        components: {CartHeader},
        mixins: [utillyMixin, routerUtil],
        data() {
            return {
                loginPath: routesPaths.login,
                userPath: routesPaths.user
            };
        },
        methods: {
            ...mapActions(["removeUserSession"]),
            logout() {
                this.removeUserSession();
                this.navigateToRoute(routesPaths.home);
            }
        },
        computed: {
            ...mapGetters(["user", "cartSize"]),
            username() {
                return this.user.username;
            },
            userProfilePicture() {
                return this.user.profilePicture || "/images/img_avatar.png";
            }
        }
    };
</script>

<style scoped lang="scss">
    .account-container {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .bar-container {
        margin-right: 5px;
        display: flex;
        cursor: default;
        & > img {
            width: 40px;
            border-radius: 20%;
        }
        & > .username {
            padding: 0 10px;
            user-select: none;
            max-width: 120px;
            display: inline-flex;
            align-items: center;
        }
    }
    .account-bar-container {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .cart-header {
        margin-right: 10px;
    }
</style>
