import { IMainCategories } from "@/interfaces/categories";
import ApiCategories from "@/services/apiCategories";
import useAsync from "../useAsync";

export default function UseMainCategories() {
    const handler = ApiCategories.getAllMainCategories;
    const {
        data: mainCategories,
        loading,
        error,
    } = useAsync<IMainCategories[] | null>(handler);

    return {
        mainCategories, loading, error
    };
}