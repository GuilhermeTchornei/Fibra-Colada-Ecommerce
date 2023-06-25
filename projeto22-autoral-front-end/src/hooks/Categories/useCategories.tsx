import useAsync from "../useAsync";
import ApiCategories from "@/services/apiCategories";
import { ProductsByCategories } from "@/interfaces/categories";
import { ISendFilter } from "@/interfaces/filter";

export default function UseCategories() {
    const handler = (mainCategoryId: number, filter: ISendFilter) => ApiCategories.getProductsByCategory(mainCategoryId, filter);
    const {
        data: products,
        act: getProducts,
        loading,
        error,
    } = useAsync<ProductsByCategories[] | null>(handler, false);

    return {
        products, getProducts, loading, error
    };
}