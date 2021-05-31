export default {
    state: {
        _products: null
    },
    mutations: {
        setProducts(state, products) {
            state._products = products;
        }
    },
    actions: {},
    getters: {
        products(state) {
            return state._products;
        }
    }
};
