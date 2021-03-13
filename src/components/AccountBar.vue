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
    import avatarImg from "../../public/images/img_avatar.png";
    import {mapGetters} from "vuex";
    import {routesPaths} from "@/router/routes";
    import localStorage from "@/services/localStorage";
    export default {
        name: "AccountBar",
        beforeCreate() {
            const user = localStorage.getValue("user");
            if (user !== undefined) {
                this.$store.commit("loginUser", user);
            }
        },
        data() {
            return {
                avatarImg,
                loginPath: routesPaths.login
            };
        },
        methods: {
            logout() {
                this.$store.commit("logoutUser");
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
                return this.user.profilePicture || avatarImg;
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
