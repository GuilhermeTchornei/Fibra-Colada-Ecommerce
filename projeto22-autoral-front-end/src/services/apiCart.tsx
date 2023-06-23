import api from "@/config/api";
import UseAuthHeader from "@/hooks/useAuthHeader";
import { CartWithProductsInterface, InsertCartProductInterface } from "@/interfaces/cart";

async function getCart(token: string) {
    const authHeader = UseAuthHeader(token);
    const response = await api.get('/cart', authHeader);
    return response.data as CartWithProductsInterface;
}

async function postCartProduct(product: InsertCartProductInterface, token: string) {
    const authHeader = UseAuthHeader(token);
    const response = await api.post('/cart', product, authHeader);
    return response.status as number;
}

async function patchCartProductQuantity(product: InsertCartProductInterface, token: string) {
    const authHeader = UseAuthHeader(token);
    const response = await api.patch('/cart/quantity', product, authHeader);
    return response.status as number;
}

async function deleteCartProduct(products_variations_id: number, token: string) {
    const authHeader = UseAuthHeader(token);
    const response = await api.delete(`/cart?products_variations_id=${products_variations_id}`, authHeader);
    return response.status as number;
}

const ApiCart = {
    getCart, postCartProduct, patchCartProductQuantity, deleteCartProduct
};
export default ApiCart;