import Item from "@/utils/classes/Item.js";
import {isUndefined} from "utilly";
export default class Cart {
    constructor() {
        this._items = [];
    }
    set items(items) {
        this._items = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            this.addItem(item.id, item.quantity);
        }
    }
    setItems(items) {
        if (isUndefined(items)) {
            items = [];
        } else if (!Array.isArray(items)) {
            items = [];
        }
        this.items = items;
    }
    get items() {
        return this._items;
    }
    _loopItems(cb) {
        for (let i = 0, len = this.items.length; i < len; i++) {
            cb(this.items[i], i);
        }
    }
    _findItemIndexById(id) {
        return this.items.findIndex(item => item.id === id);
    }
    _itemByIdCB(id, cb) {
        const itemIndex = this._findItemIndexById(id);
        const item = this.items[itemIndex] || null;
        cb(item, itemIndex);
    }
    findItemById(id) {
        let _item = null;
        this._itemByIdCB(id, item => {
            _item = item;
        });
        return _item;
    }
    addItem(id, quantity = 1) {
        this._itemByIdCB(id, item => {
            if (item === null) {
                this.items.push(new Item(id, quantity));
            } else {
                item.addQuantity(quantity);
            }
        });
    }
    removeItem(id) {
        this._itemByIdCB(id, (item, index) => {
            if (item !== null) {
                this.items.splice(index, 1);
            }
        });
    }

    getSize() {
        let count = 0;
        this._loopItems(item => {
            count += item.quantity;
        });
        return count;
    }
    toString() {
        let str = "";
        this._loopItems(item => {
            str += `----\nid -> ${item.id}\nquantity -> ${item.quantity}\n----`;
        });

        return str;
    }
}

const cart = new Cart();

cart.addItem(1, 10);
cart.addItem(1, 10);
