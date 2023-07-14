import IProductContainer from "@/interfaces/productContainer";
import useAsync from "../useAsync";
import apiProduct from "@/services/apiProducts";

export default function useNewProducts() {
    const {
        data: products,
        loading,
        error,
    } = useAsync<IProductContainer[]>(() => apiProduct.getNewProducts());

    return {
        products, loading, error
    };
}