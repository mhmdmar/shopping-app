import {isNil, isUndefined} from "utilly";
import Cart from "@/utils/classes/Cart.js";

export default {
    state: {
        _cart: new Cart(),
        _size: 0
    },
    mutations: {
        addItem(state, {id, quantity}) {
            state._cart.addItem(id, quantity);
            state._size = state._cart.getSize();
        },
        removeItem(state, {id, quantity}) {
            state._cart.removeItem(id, quantity);
            state._size = state._cart.getSize();
        },
        updateCartSize(state, size) {
            state._size = size;
        },
        initCartItems(state, items) {
            state._cart.setItems(items);
            state._size = state._cart.getSize();
        }
    },
    actions: {
        addItemToCart({commit}, payload) {
            const {id, quantity} = payload;
            if (isNil(id) || isUndefined(id)) {
                throw new Error("Cannot add product with unknown id");
            }
            commit("addItem", {id, quantity});
        },
        setCartItems({commit}, payload) {
            if (!isNil(payload) && !isUndefined(payload)) {
                const {items} = payload;
                commit("initCartItems", items);
            }
        }
    },
    getters: {
        cartSize(state) {
            return state._size;
        },
        cart(state) {
            return state._cart;
        },
        cartItems(state) {
            return state._cart.items;
        }
    }
};
