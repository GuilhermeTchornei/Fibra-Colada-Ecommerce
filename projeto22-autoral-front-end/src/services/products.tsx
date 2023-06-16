import api from "@/config/api";
import ProductPageInterface from "@/interfaces/ProductPage";

async function getOneProduct(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data as ProductPageInterface;
}

const apiProduct = {
    getOneProduct
};

export default apiProduct;