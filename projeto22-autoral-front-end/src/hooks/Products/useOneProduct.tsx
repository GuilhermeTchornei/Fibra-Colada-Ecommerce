import useAsync from "../useAsync";
import apiProduct from "@/services/apiProducts";
import ProductPageInterface from "@/interfaces/productPage";

export default function useProductPage(id: number) {
    const {
        data: product,
        loading,
        error,
    } = useAsync<ProductPageInterface>(() => apiProduct.getOneProduct(id));

    return {
        product, loading, error
    };
}