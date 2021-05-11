export default class Item {
    constructor(id, quantity = 0) {
        this._id = id;
        this._quantity = quantity;
    }
    set quantity(itemQuantity) {
        this._quantity = itemQuantity;
    }
    get quantity() {
        return this._quantity;
    }
    set id(itemId) {
        if (typeof itemId !== "string") {
            itemId = itemId.toString();
        }
        this._id = itemId;
    }
    get id() {
        return this._id;
    }
    addQuantity(quantity) {
        if (typeof quantity === "string") {
            quantity = Number(quantity);
        }
        this.quantity += quantity;
    }
}
