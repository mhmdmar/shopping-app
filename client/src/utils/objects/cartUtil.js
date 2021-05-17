import {isUndefined} from "utilly";
import {addQuantity} from "@/utils/objects/itemUtil.js";
function setItems(items) {
    const newItems = [];
    if (isUndefined(items) || !Array.isArray(items)) {
        items = [];
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        addItem(newItems, item.id, item.quantity);
    }
    return newItems;
}
function _loopItems(items, cb) {
    for (let i = 0, len = items.length; i < len; i++) {
        cb(items[i], i);
    }
}
function _findItemIndexById(items, id) {
    return items.findIndex(item => item.id === id);
}
function _itemByIdCB(items, id, cb) {
    const itemIndex = _findItemIndexById(items, id);
    const item = items[itemIndex] || null;
    cb(item, itemIndex);
}

function addItem(items, id, quantity = 1) {
    _itemByIdCB(items, id, item => {
        if (item === null) {
            items.push({id, quantity});
        } else {
            addQuantity(item, quantity);
        }
    });
}
function removeItem(items, id) {
    _itemByIdCB(items, id, (item, index) => {
        if (item !== null) {
            items.splice(index, 1);
        }
    });
}

function getSize(items) {
    let count = 0;
    _loopItems(items, item => {
        count += item.quantity;
    });
    return count;
}
function toString(items) {
    let str = "";
    _loopItems(items, item => {
        str += `----\nid -> ${item.id}\nquantity -> ${item.quantity}\n----`;
    });

    return str;
}
export default {
    setItems,
    removeItem,
    addItem,
    getSize,
    toString
};
