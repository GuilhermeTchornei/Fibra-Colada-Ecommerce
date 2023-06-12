import api from "@/config/api";

export async function useProducts() {
    const response = await api.get('/products');
    return response;
}