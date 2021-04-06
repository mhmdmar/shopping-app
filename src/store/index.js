import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import global from "@/store/modules/global.js";
import cart from "@/store/modules/cart";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        global,
        cart
    }
});
