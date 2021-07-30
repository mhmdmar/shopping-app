const notFoundPicture = "/images/logo.png";

function isLocalPath(path) {
    return !path.includes("http");
}

function addUrlToLocalImagePath(request, imagePath = notFoundPicture) {
    if (!imagePath) {
        return null;
    }
    return isLocalPath(imagePath)
        ? request.protocol + "://" + request.get("host") + imagePath
        : imagePath;
}

function addUserImageFullPath(request, user) {
    user.profilePicture = addUrlToLocalImagePath(request, user.profilePicture);
    return user;
}

function addProductImageFullPath(request, product) {
    product.picture = addUrlToLocalImagePath(request, product.picture);
    return product;
}

function addProductsImageFullPath(request, products) {
    if (Array.isArray(products)) {
        for (let i = 0, len = products.length; i < len; i++) {
            const product = products[i];
            addProductImageFullPath(request, product);
        }
    }
    return products;
}

function validateNumber(input) {
    if (isNaN(input)) {
        input = 1;
    } else if (typeof input !== "number") {
        input = Number(input);
    }
    return input;
}

export {
    addUserImageFullPath,
    addProductImageFullPath,
    addProductsImageFullPath,
    validateNumber
};
