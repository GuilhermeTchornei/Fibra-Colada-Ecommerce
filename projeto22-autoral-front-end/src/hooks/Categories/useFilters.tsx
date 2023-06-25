import { IGetFilter, ISendFilter } from "@/interfaces/filter";
import useAsync from "../useAsync";
import ApiCategories from "@/services/apiCategories";

export default function UseFilter() {
    const handler = (categoryId: number) => ApiCategories.getFilters(categoryId);
    const {
        data: filterOptions,
        act: getFilterOptions,
        loading,
        error,
    } = useAsync<IGetFilter | null>(handler, false);

    return {
        filterOptions, getFilterOptions, loading, error
    };
}