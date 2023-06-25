import api from "@/config/api";
import { IMainCategories, ProductsByCategories } from "@/interfaces/categories";
import { IGetFilter, ISendFilter } from "@/interfaces/filter";

async function getAllMainCategories() {
    const response = await api.get(`/categories/main`);
    return response.data as IMainCategories[];
}

async function getProductsByCategory(mainCategoryId: number, filter: ISendFilter) {
    const response = await api.get(`/categories/${mainCategoryId}`, {
        params: {
            categoriesIds: filter.categories,
            stampsIds: filter.stamps,
            sizesIds: filter.sizes,
        }
    });
    return response.data as ProductsByCategories[];
}

async function getFilters(categoryId: number) {
    const response = await api.get(`/categories/${categoryId}/filters`);
    return response.data as IGetFilter;
}

const ApiCategories = {
    getProductsByCategory, getFilters, getAllMainCategories
};
export default ApiCategories;