<template>
    <div class="sidenav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
</template>
<script>
    export default {
        name: "SignIn",
        props: {}
    };
</script>

<style scoped lang="scss">
    .sidenav {
        height: 100%;
        width: 160px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
    }

    .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }
</style>
