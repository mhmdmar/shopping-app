import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import global from "@/store/modules/global.js";
import cartModule from "@/store/modules/cart";
import products from "@/store/modules/products";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({isCompression: false});
Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ],
    modules: {
        user,
        global,
        cartModule,
        products
    }
});

export default store;
