<template>
    <div>
        <div class="account-container" v-if="loggedIn">
            <img :src="avatarImg" alt="img_avatar" />
            <span class="username">User name</span>
            <b-dropdown
                id="dropdown-right"
                right
                text=""
                variant="primary"
                class="s-1"
            >
                <b-dropdown-item href="#">Logout</b-dropdown-item>
            </b-dropdown>
        </div>
        <div v-else>
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
    import avatarImg from "@/assets/img_avatar.png";
    import {mapState} from "vuex";
    export default {
        name: "AccountBar",
        data() {
            return {
                avatarImg
            };
        },
        computed: mapState(["loggedIn"])
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
