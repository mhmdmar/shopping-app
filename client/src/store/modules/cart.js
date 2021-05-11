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
        },
        removeItem(state, {id, quantity}) {
            state._cart.removeItem(id, quantity);
        },
        updateCartSize(state, size) {
            state._size = size;
        },
        initCartItems(state, items) {
            state._cart.setItems(items);
        }
    },
    actions: {
        addItemToCart({state, commit}, payload) {
            const {id, quantity} = payload;
            if (isNil(id) || isUndefined(id)) {
                throw new Error("Cannot add product with unknown id");
            }
            commit("addItem", {id, quantity});
            commit("updateCartSize", state._cart.getSize());
        },
        setCartItems({state, commit}, payload) {
            if (!isNil(payload) && !isUndefined(payload)) {
                const {items} = payload;
                commit("initCartItems", items);
                commit("updateCartSize", state._cart.getSize());
            }
        }
    },
    getters: {
        cartSize(state) {
            return state._size;
        },
        cartItems(state) {
            return state._cart.items;
        },
        cartItemsId(state) {
            let productsId = [];
            const items = state._cart.items;
            for (let i = 0, len = items.length; i < len; i++) {
                productsId.push(items[i].id);
            }
            return productsId;
        }
    }
};