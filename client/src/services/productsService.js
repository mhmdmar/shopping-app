import API from "@/services/API";

export const productsService = {
    async getProducts() {
        const res = await API.get(`/products`);
        const {error, data} = res.data;
        if (error) {
            console.error(error);
        } else {
            return data;
        }
    },
    async getProductsFromList(productsList) {
        if (!Array.isArray(productsList)) {
            return [];
        }
        const idList = productsList.map(product => product.productId);
        const res = await API.get(`/products`, {
            params: {
                productId: idList
            }
        });
        const {error, data} = res.data;
        if (error) {
            return [];
        }
        return (
            data?.map(item => {
                return {
                    ...item,
                    quantity: productsList.find(
                        product => product.productId === item.id
                    )?.quantity
                };
            }) || []
        );
    },
    async getProduct(productId) {
        let res = await API.get(`/product`, {
            params: {
                id: productId
            }
        });
        const {error, data} = res.data;
        if (error) {
            return null;
        } else {
            return data;
        }
    }
};
