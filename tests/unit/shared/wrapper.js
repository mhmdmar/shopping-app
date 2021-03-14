import Vuex from "vuex";
import VueRouter from "vue-router";
import {mockStore} from "./mockStore.js";
import {shallowMount, createLocalVue} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();
const store = new Vuex.Store({
    modules: {
        mockStore
    }
});
export default function wrapComponent(component) {
    return shallowMount(component, {
        stubs: ["router-link"],
        store,
        router,
        localVue
    });
}
