class Cart {
    constructor() {
        this.items = {};
    }
    addItem(id, quantity = 1) {
        if (this.items[id] === undefined) {
            this.items[id] = 0;
        }
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        this.items[id] += quantity;
    }
    removeItem(id, quantity = 1) {
        if (this.items[id] !== undefined) {
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
        }
    },
    actions: {
        addItemToCart({state, commit}, payload) {
            const {id, quantity} = payload;
            if (id === undefined) {
                throw new Error("Cannot add unknown product");
            }
            commit("addItem", {id, quantity});
            commit("updateCartSize", state._cart.getSize());
        }
    },
    getters: {
        cartSize(state) {
            return state._size;
        }
    }
};
