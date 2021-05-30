import {isNil, isUndefined} from "utilly";
import cartUtil from "@/utils/objects/cartUtil.js";
export default {
    state: {
        items: [],
        size: 0
    },
    mutations: {
        addItem(state, {id, quantity}) {
            cartUtil.addItem(state.items, id, quantity);
            this.commit("updateCart");
        },
        updateCart() {
            this.commit("updateCartSize");
        },
        removeItem(state, {id}) {
            cartUtil.removeItem(state.items, id);
            this.commit("updateCart");
        },
        updateCartSize(state) {
            state.size = cartUtil.getSize(state.items);
        },
        setCartItems(state, items) {
            state.items = cartUtil.setItems(items);
            this.commit("updateCart");
        }
    },
    actions: {
        addItemToCart({commit}, payload) {
            const {id, quantity} = payload;
            if (isNil(id) || isUndefined(id)) {
                throw new Error("Cannot add product with unknown id");
            }
            commit("addItem", {id, quantity});
        }
    },
    getters: {
        cartSize(state) {
            return state.size;
        },
        cartItems(state) {
            return state.items;
        }
    }
};
