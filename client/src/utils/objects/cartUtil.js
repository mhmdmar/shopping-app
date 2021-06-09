import {isUndefined} from "utilly";
import {addQuantity} from "@/utils/objects/itemUtil.js";
function setItems(items) {
    const newItems = [];
    if (isUndefined(items) || !Array.isArray(items)) {
        items = [];
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        addItem(newItems, item.productId, item.quantity);
    }
    return newItems;
}
function _loopItems(items, cb) {
    for (let i = 0, len = items.length; i < len; i++) {
        cb(items[i], i);
    }
}
function _findItemIndexById(items, productId) {
    return items.findIndex(item => item.productId === productId);
}
function _itemByIdCB(items, productId, cb) {
    const itemIndex = _findItemIndexById(items, productId);
    const item = items[itemIndex] || null;
    cb(item, itemIndex);
}

function addItem(items, productId, quantity = 1) {
    _itemByIdCB(items, productId, item => {
        if (item === null) {
            items.push({productId, quantity});
        } else {
            addQuantity(item, quantity);
        }
    });
}
function removeItem(items, productId) {
    _itemByIdCB(items, productId, (item, index) => {
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
export default {
    setItems,
    removeItem,
    addItem,
    getSize
};
