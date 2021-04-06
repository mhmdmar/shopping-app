import {isUndefined} from "utilly";
class Cart {
    constructor() {
        this.items = {};
    }
    initItems(items) {
        this.items = {};
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            this.addItem(item.id, item.quantity);
        }
    }
    addItem(id, quantity = 1) {
        if (isUndefined(this.items[id])) {
            this.items[id] = 0;
        }
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        this.items[id] += quantity;
    }
    removeItem(id, quantity = 1) {
        if (!isUndefined(this.items[id])) {
            this.items[id] -= quantity;
            if (this.items[id] <= 0) {
                delete this.items[id];
            }
        }
    }
    _loopItems(cb) {
        Object.keys(this.items).forEach(item => {
            cb(item, this.items[item]);
        });
    }
    getSize() {
        let count = 0;
        this._loopItems((_, quantity) => {
            count += quantity;
        });
        return count;
    }
    toString() {
        let str = "";
        this._loopItems((id, quantity) => {
            str += `id -> ${id}\n quantity -> ${quantity}\n`;
        });

        return str;
    }
}

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
            state._cart.initItems(items);
        }
    },
    actions: {
        addItemToCart({state, commit}, payload) {
            const {id, quantity} = payload;
            if (isUndefined(id)) {
                throw new Error("Cannot add unknown product");
            }
            commit("addItem", {id, quantity});
            commit("updateCartSize", state._cart.getSize());
        },
        setCartItems({state, commit}, {items}) {
            if (isUndefined(items)) {
                return;
            }
            commit("initCartItems", items);
            commit("updateCartSize", state._cart.getSize());
        }
    },
    getters: {
        cartSize(state) {
            return state._size;
        },
        items(state) {
            return state._cart;
        }
    }
};
