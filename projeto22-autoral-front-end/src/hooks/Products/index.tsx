import api from "@/config/api";
import useAsync from "../useAsync";
import apiProduct from "@/services/products";
import ProductPageInterface from "@/interfaces/ProductPage";

export async function useAllProducts() {
    const response = await api.get('/products');
    return response;
}

export function useOneProduct(id: number) {
    const {
        data: product,
        loading,
        error,
    } = useAsync<ProductPageInterface>(() => apiProduct.getOneProduct(id));

    return {
        product, loading, error
    };
}