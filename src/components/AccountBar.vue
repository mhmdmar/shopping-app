<template>
    <div>
        <div class="account-container" v-if="!!user">
            <img :src="userProfilePicture" alt="img_avatar" />
            <span class="username">{{ username }}</span>
            <b-dropdown
                id="dropdown-right"
                right
                text=""
                variant="primary"
                class="s-1"
            >
                <b-dropdown-item href="#">Placeholder</b-dropdown-item>
                <b-dropdown-item href="#">Placeholder</b-dropdown-item>
                <b-dropdown-item href="#">Placeholder</b-dropdown-item>
                <div class="dropdown-divider"></div>
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
    import {mapGetters, mapMutations} from "vuex";
    import {routesPaths} from "@/router/routes";
    import localStorage from "@/services/localStorage";
    export default {
        name: "AccountBar",
        beforeCreate() {
            const user = localStorage.getValue("user");
            if (user !== undefined) {
                this.loginUser(user);
            }
        },
        data() {
            return {
                loginPath: routesPaths.login
            };
        },
        methods: {
            ...mapMutations(["loginUser", "logoutUser"]),
            logout() {
                this.logoutUser();
                if (this.$route.path !== routesPaths.home) {
                    this.$router.push(routesPaths.home);
                }
            }
        },
        computed: {
            ...mapGetters(["user"]),
            username() {
                return this.user.username || "";
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
        justify-content: space-evenly;
        & > img {
            height: 28px;
            width: 28px;
            border-radius: 50%;
        }
        & > .username {
            padding: 0 10px;
            user-select: none;
        }
    }
</style>
