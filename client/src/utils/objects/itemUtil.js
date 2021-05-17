function addQuantity(item, quantity) {
    if (typeof quantity === "string") {
        quantity = Number(quantity);
    }
    item.quantity += quantity;
}

export {addQuantity};
