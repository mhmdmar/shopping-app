import API from "@/services/API";

export const productsService = {
    async getProducts() {
        const res = await API.get(`/products`);
        const {error, items} = res.data;
        return {error, items};
    },
    async getProductsFromList(productsList) {
        if (!Array.isArray(productsList)) {
            return [];
        }
        const idList = productsList.map(product => product.id);
        const idQuery = `id=${idList.join("&id=")}`;
        const res = await API.get(`/products?${idQuery}`);
        const {error, items} = res.data;
        if (error) {
            return [];
        }
        return items.map(item => {
            return {
                ...item,
                quantity: productsList.find(product => product.id === item.id)
                    ?.quantity
            };
        });
    },
    async getProduct(productId) {
        let res = await API.get(`/product?id=${productId}`);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }
};
