import api from "@/config/api";

export async function useProducts() {
    const response = api.get('/products');
    return response;
}