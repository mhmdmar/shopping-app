import Vue from "vue";
import Vuex from "vuex";
import usermodule from "@/store/usermodule";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        usermodule
    }
});
