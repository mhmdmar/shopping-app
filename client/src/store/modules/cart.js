import cartUtil from "@/utils/objects/cartUtil.js";
export default {
    state: {
        items: [],
        _cartId: null,
        size: 0
    },
    mutations: {
        updateCartSize(state) {
            state.size = cartUtil.getSize(state.items);
        },
        setCartItems(state, items) {
            state.items = cartUtil.setItems(items);
        },
        setCartId(state, cartId) {
            state._cartId = cartId;
        }
    },
    actions: {
        updateCartItems({commit}, payload) {
            commit("setCartItems", payload);
            commit("updateCartSize");
        }
    },
    getters: {
        cartSize(state) {
            return state.size;
        },
        cartItems(state) {
            return state.items;
        },
        cartId(state) {
            return state._cartId;
        }
    }
};
