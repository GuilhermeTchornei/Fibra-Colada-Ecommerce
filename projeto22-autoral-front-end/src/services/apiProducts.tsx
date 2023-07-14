import api from "@/config/api";
import IProductContainer from "@/interfaces/productContainer";
import ProductPageInterface from "@/interfaces/productPage";

async function getOneProduct(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data as ProductPageInterface;
}

async function getNewProducts() {
    const response = await api.get('/products/news');
    return response.data as IProductContainer[]
}

const ApiProduct = {
    getOneProduct, getNewProducts
};

export default ApiProduct;