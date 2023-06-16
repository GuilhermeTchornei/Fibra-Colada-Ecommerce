import api from "@/config/api";
import ProductPageInterface from "@/interfaces/productPage";

async function getOneProduct(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data as ProductPageInterface;
}

const ApiProduct = {
    getOneProduct
};

export default ApiProduct;