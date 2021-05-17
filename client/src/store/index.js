import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import global from "@/store/modules/global.js";
import cartModule from "@/store/modules/cart";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        user,
        global,
        cartModule
    }
});

export default store;
